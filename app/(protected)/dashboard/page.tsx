import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { filterSheetData } from '@/lib/utils';

import { DashboardChart } from './_components/DashboardChart';
import { AnalysisCard } from './_components/AnalysisCard';
import { generateResponseFromPrompt } from '@/lib/ai';

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

	const {
		sheetsNames,
		sheetsTotalAmount,
		sheetsTotalExpenses,
		sheetsTotalProfit,
		lastSixSheets,
		mediumAmount,
		mediumExpense,
		mediumProfit,
	} = filterSheetData(sheets);

	// const res = await generateResponseFromPrompt('Como me manter saudável financeiramente?');

	return (
		<main className='flex-1'>
			<div className='mb-12 px-4'>
				<h1 className='text-green-600 text-4xl font-bold text-center'>Painel</h1>
				<p className='text-center text-neutral-500'>
					Bem-vindo ao seu painel no Finnancia! Veja análises sobre seus dados e gerencie suas finanças
					mensais
				</p>
			</div>
			<section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2'>
				<AnalysisCard
					title='Lucro médio'
					textColor='green-600'
					value={mediumProfit}
				/>
			</section>
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
