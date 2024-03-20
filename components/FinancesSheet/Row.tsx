import { Finance } from '@prisma/client';

import { cn } from '@/lib/utils';

import { TableRow, TableCell } from '../ui/table';
import { ActionsDropdown } from './ActionsDropdown';

interface RowProps {
	finance: Finance;
	i: number;
}

export const Row = ({ finance, i }: RowProps) => {
	return (
		<TableRow
			key={finance.id}
			className={i % 2 === 0 ? 'bg-white hover:bg-white' : 'bg-neutral-100 hover:bg-neutral-100'}
		>
			<TableCell className='text-center'>{finance.title}</TableCell>
			<TableCell className={cn('text-center', finance.type === 'PROFIT' ? 'text-green-500' : 'text-red-500')}>
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
