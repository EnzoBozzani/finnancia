import { Expense } from '@prisma/client';

import { ActionsDropdown } from './ExpensesSheet/ActionsDropdown';

export const ExpensesMobileRow = ({ expense }: { expense: Expense }) => {
	return (
		<div className='w-full grid grid-cols-2 gap-x-2 py-4 px-8 bg-white'>
			<div className='flex flex-col items-start justify-center gap-y-2'>
				<p className='text-sm break-all'>{expense.title}</p>
				<div className='rounded bg-neutral-200 px-2 py-1 text-xs font-semibold'>{expense.date}</div>
			</div>
			<div className='flex flex-col items-end justify-center'>
				<div className='flex flex-col items-end justify-center gap-y-2'>
					<p className='text-sm break-all font-semibold text-end'>
						{expense.amount.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
					<ActionsDropdown expense={expense} />
				</div>
			</div>
		</div>
	);
};
