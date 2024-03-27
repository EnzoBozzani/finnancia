'use client';

import { Finance } from '@prisma/client';

import { cn } from '@/lib/utils';

import { TableRow, TableCell } from '../ui/table';
import { ActionsDropdown } from './ActionsDropdown';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

interface RowProps {
	finance: Finance;
}

export const Row = ({ finance }: RowProps) => {
	const isDark = useIsDarkTheme();

	return (
		<TableRow
			key={finance.id}
			className={cn(
				'outline-none border-none',
				isDark
					? 'bg-neutral-900 text-white hover:bg-neutral-800'
					: 'bg-neutral-100 text-black hover:bg-neutral-200'
			)}
		>
			<TableCell className='text-center'>{finance.title}</TableCell>
			<TableCell
				className={cn(
					'text-center',
					finance.type === 'PROFIT'
						? isDark
							? 'text-green-200'
							: 'text-green-600'
						: isDark
						? 'text-red-200'
						: 'text-red-600'
				)}
			>
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
