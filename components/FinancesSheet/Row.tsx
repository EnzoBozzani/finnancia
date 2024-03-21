import { Finance } from '@prisma/client';

import { cn } from '@/lib/utils';

import { TableRow, TableCell } from '../ui/table';
import { ActionsDropdown } from './ActionsDropdown';

interface RowProps {
	finance: Finance;
}

export const Row = ({ finance }: RowProps) => {
	return (
		<TableRow
			key={finance.id}
			className={finance.type === 'PROFIT' ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}
		>
			<TableCell className='text-center'>{finance.title}</TableCell>
			<TableCell className={cn('text-center', finance.type === 'PROFIT' ? 'text-green-700' : 'text-red-700')}>
				{finance.type === 'PROFIT' ? '+ ' : '- '}
				{finance.amount.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
			<TableCell className='text-center'>{finance.date}</TableCell>
			<TableCell className='grid place-items-center'>
				<ActionsDropdown finance={finance} />
			</TableCell>
		</TableRow>
	);
};
