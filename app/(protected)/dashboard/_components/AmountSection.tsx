'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';

export const AmountSection = ({ userTotalAmount }: { userTotalAmount: number }) => {
	const isDark = useIsDarkTheme();

	const textColor =
		userTotalAmount > 0
			? isDark
				? 'text-green-400'
				: 'text-green-700'
			: userTotalAmount === 0
			? 'text-neutral-300'
			: isDark
			? 'text-red-400'
			: 'text-red-700';

	return (
		<section
			className={cn(
				'w-[95%] mx-auto flex flex-col gap-y-4 mb-12 text-center lg:text-start',
				isDark ? 'text-neutral-100' : 'text-neutral-800'
			)}
		>
			<p className='text-2xl md:text-4xl font-bold'>SALDO TOTAL</p>
			<p className={cn('text-4xl sm:text-6xl md:text-8xl font-bold', textColor)}>
				{currencyFormat(userTotalAmount)}
			</p>
			<p className='text-sm sm:text-base'>
				Saldo total da sua conta, somando os saldos de cada planilhas e com as devidas alterações.
			</p>
			<button
				className={cn(
					'px-4 py-2 mx-auto border rounded-lg hover:bg-transparent transition duration-200',
					isDark
						? `bg-neutral-900 border-neutral-700 text-neutral-400`
						: `bg-neutral-100 border-neutral-300 text-neutral-700`
				)}
			>
				Alterar
			</button>
		</section>
	);
};
