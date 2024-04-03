import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { getSheetTimeSinceJanuary1970 } from '@/lib/utils';

import { DashboardChart } from './_components/DashboardChart';

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
			<div className='mb-12 px-4'>
				<h1 className='text-green-600 text-4xl font-bold text-center'>Painel</h1>
				<p className='text-center text-neutral-500'>
					Bem-vindo ao seu painel no Finnancia! Veja análises sobre seus dados e gerencie suas finanças
					mensais
				</p>
			</div>
			<section className='w-[95%] mx-auto'>
				<DashboardChart
					colors={['#0284c7', '#16a34a', '#dc2626']}
					datasets={[sheetsTotalAmount, sheetsTotalProfit, sheetsTotalExpenses]}
					datasetsLabels={['Saldo', 'Ganho', 'Gasto']}
					labels={sheetsNames}
					sheets={lastSixSheets.reverse()}
				/>
			</section>
		</main>
	);
};

export default DashboardPage;
