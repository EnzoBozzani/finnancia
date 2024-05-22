import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { filterSheetData } from '@/lib/utils';

import { DashboardChart } from './_components/DashboardChart';
import { AnalysisCard } from './_components/AnalysisCard';
import { AmountSection } from './_components/AmountSection';
import { CategoryAccordion } from './_components/CategoryAccordion';

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

	const dbUser = await db.user.findUnique({
		where: { id: user.id },
		select: { totalAmount: true, isInitialAmountSet: true },
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
		currentMonthSheetTotalAmount,
		currentMonthSheetTotalExpense,
		currentMonthSheetTotalProfit,
		positiveSheets,
		negativeSheets,
		neutralSheets,
	} = filterSheetData(sheets);

	return (
		<main className='flex-1'>
			<div className='mb-12 px-4'>
				<p className='text-center text-neutral-500'>
					Bem-vindo ao seu painel no Finnancia! Veja análises sobre seus dados e gerencie suas finanças
				</p>
			</div>
			<AmountSection
				userTotalAmount={dbUser?.totalAmount || 0}
				isInitialAmountSet={dbUser?.isInitialAmountSet || false}
			/>
			<section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
				<AnalysisCard
					title='Ganho'
					textColor='green'
					medium={mediumProfit}
					currentMonthSheetValue={currentMonthSheetTotalProfit}
				/>
				<AnalysisCard
					title='Gasto'
					textColor='red'
					medium={mediumExpense}
					currentMonthSheetValue={currentMonthSheetTotalExpense}
				/>
				<AnalysisCard
					title='Saldo'
					textColor='sky'
					medium={mediumAmount}
					currentMonthSheetValue={currentMonthSheetTotalAmount}
				/>
				<AnalysisCard
					lastCard
					medium={0}
					title='Número de planilhas'
					textColor='neutral'
					currentMonthSheetValue={sheets.length}
					nSheets={[positiveSheets, negativeSheets, neutralSheets]}
				/>
			</section>
			<section className='w-[95%] mx-auto mb-8'>
				<CategoryAccordion />
			</section>
			<section className='w-[95%] mx-auto mb-8'>
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
