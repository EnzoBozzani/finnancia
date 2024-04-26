'use client';

import { Button } from '@/components/ui/button';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useSetInitialAmountModal } from '@/hooks/useSetInitialAmountModal';
import { cn, currencyFormat } from '@/lib/utils';
import { useAmountVisibility } from '@/hooks/useAmountVisibility';

import { SwitchVisibility } from './SwitchVisibilty';

export const AmountSection = ({
	userTotalAmount,
	isInitialAmountSet,
}: {
	userTotalAmount: number;
	isInitialAmountSet: boolean;
}) => {
	const isDark = useIsDarkTheme();

	const onOpen = useSetInitialAmountModal((state) => state.onOpen);

	const isVisible = useAmountVisibility((state) => state.isVisible);

	const textColor =
		userTotalAmount > 0 ? (isDark ? 'text-green-400' : 'text-green-700') : isDark ? 'text-red-400' : 'text-red-700';

	return (
		<section
			className={cn(
				'w-[95%] mx-auto flex flex-col gap-y-4 mb-12 text-center lg:text-start',
				isDark ? 'text-neutral-100' : 'text-neutral-800'
			)}
		>
			<div className='flex items-center justify-center lg:justify-start gap-x-4'>
				<p className='text-2xl md:text-4xl font-bold'>SALDO TOTAL</p>
				<SwitchVisibility />
			</div>
			{isInitialAmountSet ? (
				<p
					className={cn(
						'text-4xl sm:text-6xl md:text-8xl font-bold max-w-[800px] break-all',
						userTotalAmount === 0 ? 'text-neutral-500' : textColor,
						!isVisible && 'line-through text-transparent decoration-neutral-500'
					)}
				>
					{currencyFormat(userTotalAmount)}
				</p>
			) : (
				<div className='w-full flex items-center justify-center lg:justify-start'>
					<Button
						className='text-lg sm:text-xl md:text-2xl lg:text-4xl p-6 md:p-8 lg:p-12 uppercase'
						onClick={() => onOpen()}
					>
						Definir saldo inicial
					</Button>
				</div>
			)}

			<p className='text-sm sm:text-base'>
				Saldo total da sua conta, somando os saldos de cada planilhas e o saldo inicial.
			</p>
		</section>
	);
};
