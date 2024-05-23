'use client';

import { Category, Finance } from '@prisma/client';

import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { TableRow, TableCell } from '../ui/table';
import { ActionsDropdown } from './ActionsDropdown';

type FinanceWithCategory = Finance & {
	category?: Category;
};

interface RowProps {
	finance: FinanceWithCategory;
}

export const Row = ({ finance }: RowProps) => {
	const isDark = useIsDarkTheme();

	if (finance.id.startsWith('fake-id')) {
		return (
			<TableRow
				className={cn(
					'outline-none border-b h-[65px]',
					isDark
						? 'bg-neutral-950 text-white hover:bg-neutral-950 border-neutral-700'
						: 'bg-white text-black hover:bg-white border-neutral-300'
				)}
			>
				<TableCell className='text-center'></TableCell>
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
				></TableCell>
				<TableCell className='text-center'></TableCell>
				<TableCell className='grid place-items-center'></TableCell>
			</TableRow>
		);
	}

	return (
		<TableRow
			className={cn(
				'outline-none border-b',
				isDark
					? 'bg-neutral-950 text-white hover:bg-neutral-900 border-neutral-700'
					: 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
			)}
			style={{
				backgroundColor: finance.category
					? finance.category.color === 'null'
						? ''
						: finance.category.color
					: '',
			}}
		>
			<TableCell className='text-center'>{finance.title}</TableCell>
			<TableCell
				className={cn(
					'text-center font-semibold whitespace-nowrap',
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
				{currencyFormat(finance.amount)}
			</TableCell>
			<TableCell className='text-center'>{finance.category ? finance.category.name : '-'}</TableCell>
			<TableCell className='text-center'>{finance.date}</TableCell>
			<TableCell className='grid place-items-center'>
				<ActionsDropdown finance={finance} />
			</TableCell>
		</TableRow>
	);
};
