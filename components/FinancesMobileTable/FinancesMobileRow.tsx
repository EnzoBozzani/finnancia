'use client';

import { Finance } from '@prisma/client';

import { cn } from '@/lib/utils';

import { ActionsDropdown } from '../FinancesSheet/ActionsDropdown';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

export const FinancesMobileRow = ({ finance }: { finance: Finance }) => {
	const isDark = useIsDarkTheme();

	return (
		<div
			className={cn(
				'w-full grid grid-cols-2 gap-x-2 p-4 border-b',
				isDark ? 'bg-neutral-950 text-white border-neutral-700' : 'bg-white text-black border-neutral-300'
			)}
		>
			<div className='flex flex-col items-start justify-center gap-y-2'>
				<p className='text-sm break-all'>{finance.title}</p>
				<div
					className={cn(
						'rounded px-2 py-1 text-xs font-semibold',
						isDark ? 'bg-neutral-800' : 'bg-neutral-200'
					)}
				>
					{finance.date}
				</div>
			</div>
			<div className='flex flex-col items-end justify-center'>
				<div className='flex flex-col items-end justify-center gap-y-2'>
					<p
						className={cn(
							'text-sm break-all font-semibold text-end',
							finance.type === 'PROFIT' ? 'text-green-500' : 'text-red-500'
						)}
					>
						{finance.type === 'PROFIT' ? '+ ' : '- '}
						{finance.amount.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
					<ActionsDropdown finance={finance} />
				</div>
			</div>
		</div>
	);
};
