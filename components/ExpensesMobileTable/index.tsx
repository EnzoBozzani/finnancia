import { Expense, Sheet } from '@prisma/client';

import { ExpensesMobileRow } from './ExpensesMobileRow';

interface SheetWithExpenses extends Sheet {
	expenses: Expense[];
}

interface ExpensesMobileTableProps {
	sheetData: SheetWithExpenses;
}

export const ExpensesMobileTable = ({ sheetData }: ExpensesMobileTableProps) => {
	return (
		<section className='block lg:hidden mb-24'>
			{sheetData.expenses.length === 0 ? (
				<>
					<div className='w-full p-4 bg-white border-t text-center font-semibold'>
						Nenhuma finança encontrada
					</div>
				</>
			) : (
				sheetData.expenses.map((expense) => (
					<ExpensesMobileRow
						expense={expense}
						key={expense.id}
					/>
				))
			)}
			<div className='w-full grid grid-cols-2 gap-x-2 p-4 bg-white border-t'>
				<p className='text-sm font-semibold'>Saldo total:</p>
				<p className='text-red-600 text-sm break-all font-semibold text-end'>
					{sheetData.totalAmount.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</p>
			</div>
		</section>
	);
};
