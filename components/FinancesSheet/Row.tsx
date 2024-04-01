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
				'outline-none border-b',
				isDark
					? 'bg-neutral-950 text-white hover:bg-neutral-900 border-neutral-700'
					: 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
			)}
		>
			<TableCell className='text-center'>{finance.title}</TableCell>
			<TableCell
				className={cn(
					'text-center font-semibold',
					finance.type === 'PROFIT'
						? isDark
							? 'text-green-400'
							: 'text-green-700'
						: isDark
						? 'text-red-400'
						: 'text-red-700'
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
