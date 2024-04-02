import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { DashboardChart } from './_components/DashboardChart';
import { getSheetTimeSinceJanuary1970 } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Painel',
};

const DashboardPage = async () => {
	const user = await currentUser();

	const sheets = await db.sheet.findMany({
		where: { userId: user.id },
		include: {
			finances: { select: { type: true, amount: true } },
		},
	});

	const lastSixSheets = sheets
		.filter((sheet) => getSheetTimeSinceJanuary1970(sheet) < new Date().valueOf())
		.sort((sheetA, sheetB) => getSheetTimeSinceJanuary1970(sheetA) - getSheetTimeSinceJanuary1970(sheetB))
		.slice(-6);

	const sheetsNames: string[] = [];
	const sheetsTotalExpenses: number[] = [];
	const sheetsTotalProfit: number[] = [];
	const sheetsTotalAmount: number[] = [];

	lastSixSheets.forEach((sheet) => {
		sheetsNames.push(sheet.name);
		sheetsTotalExpenses.push(
			sheet.finances.reduce(
				(current, finance) => (finance.type === 'EXPENSE' ? current + finance.amount : current),
				0
			)
		);
		sheetsTotalProfit.push(
			sheet.finances.reduce(
				(current, finance) => (finance.type === 'PROFIT' ? current + finance.amount : current),
				0
			)
		);
		sheetsTotalAmount.push(sheet.totalAmount);
	});

	return (
		<main className='flex-1'>
			<section className='w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4'>
				<div>
					<DashboardChart
						color={'#16a34a'}
						dataset={sheetsTotalProfit}
						datasetLabel='Ganho total do mês'
						labels={sheetsNames}
						title='Ganhos por mês'
					/>
				</div>
				<div>
					<DashboardChart
						color={'#dc2626'}
						dataset={sheetsTotalExpenses}
						datasetLabel='Gasto total do mês'
						labels={sheetsNames}
						title='Gastos por mês'
					/>
				</div>
				<div>
					<DashboardChart
						color={'#0284c7'}
						dataset={sheetsTotalAmount}
						datasetLabel='Saldo total do mês'
						labels={sheetsNames}
						title='Saldos por mês'
					/>
				</div>
				<div>
					<DashboardChart
						color={'#16a34a'}
						dataset={sheetsTotalExpenses}
						datasetLabel='Gasto total do mês'
						labels={sheetsNames}
						title='Gastos por mês'
					/>
				</div>
			</section>
		</main>
	);
};

export default DashboardPage;
