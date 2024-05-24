'use client';

import { Category, Finance } from '@prisma/client';

import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { ActionsDropdown } from '@/components/FinancesSheet/ActionsDropdown';

export const FinancesMobileRow = ({ finance }: { finance: Finance & { category?: Category } }) => {
	const isDark = useIsDarkTheme();

	const bgColor =
		finance.category && finance.category.color !== 'transparent'
			? isDark
				? `bg-${finance.category.color}-950`
				: `bg-${finance.category.color}-100`
			: 'bg-transparent';

	return (
		<div
			className={cn(
				'w-full grid grid-cols-2 gap-x-2 p-4 border-b',
				isDark ? 'bg-neutral-950 text-white border-neutral-700' : 'bg-white text-black border-neutral-300',
				bgColor
			)}
		>
			<div className='flex flex-col items-start justify-center gap-y-2'>
				<p className='text-sm break-words'>{finance.title}</p>
				<div
					className={cn(
						'rounded px-2 py-1 text-xs font-semibold',
						isDark ? 'bg-neutral-800' : 'bg-neutral-200'
					)}
				>
					{finance.date}
				</div>
				<p className='text-xs break-words font-semibold'>
					{finance.category ? finance.category.name : 'Sem categoria'}
				</p>
			</div>
			<div className='flex flex-col items-end justify-center'>
				<div className='flex flex-col items-end justify-center gap-y-2'>
					<p
						className={cn(
							'text-sm break-all font-semibold text-end',
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
					</p>
					<ActionsDropdown finance={finance} />
				</div>
			</div>
		</div>
	);
};
