import { RiMoreFill } from 'react-icons/ri';

import { TableRow, TableCell } from '../ui/table';
import { Expense } from '@prisma/client';

interface RowProps {
	expense: Expense;
	i: number;
}

export const Row = ({ expense, i }: RowProps) => {
	return (
		<TableRow
			key={expense.id}
			className={i % 2 === 0 ? 'bg-white hover:bg-white' : 'bg-neutral-100 hover:bg-neutral-100'}
		>
			<TableCell className='text-center'>{expense.title}</TableCell>
			<TableCell className='text-center'>
				{expense.amount.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
			<TableCell className='text-center'>{expense.date}</TableCell>
			<TableCell className='flex items-center justify-center'>
				<button className='rounded-full hover:bg-neutral-200 px-2'>
					<RiMoreFill className='text-neutral-600 w-12 h-12' />
				</button>
			</TableCell>
		</TableRow>
	);
};
