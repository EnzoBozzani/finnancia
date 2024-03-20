import { Finance } from '@prisma/client';

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
			<TableCell className='text-center text-red-600'>
				-{' '}
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
