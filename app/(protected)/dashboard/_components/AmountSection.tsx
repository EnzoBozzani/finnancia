'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useSetInitialAmountModal } from '@/hooks/useSetInitialAmountModal';
import { cn, currencyFormat } from '@/lib/utils';
import { useAmountVisibility } from '@/hooks/useAmountVisibility';
import { useChangeAmountModal } from '@/hooks/useChangeAmountModal';
import { Button } from '@/components/ui/button';

import { SwitchVisibility } from './SwitchVisibilty';

export const AmountSection = ({
	userTotalAmount,
	isInitialAmountSet,
}: {
	userTotalAmount: number;
	isInitialAmountSet: boolean;
}) => {
	const isDark = useIsDarkTheme();

	const openSetInitialAmount = useSetInitialAmountModal((state) => state.onOpen);

	const isVisible = useAmountVisibility((state) => state.isVisible);

	const openChangeAmount = useChangeAmountModal((state) => state.onOpen);

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
			<div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-8 gap-y-2'>
				<p
					className={cn(
						'text-2xl sm:text-4xl md:text-6xl font-bold max-w-[800px] break-all',
						userTotalAmount === 0 ? 'text-neutral-500' : textColor,
						!isVisible && 'line-through text-transparent decoration-neutral-500'
					)}
				>
					{currencyFormat(userTotalAmount)}
				</p>
				<Button
					onClick={() => {
						isInitialAmountSet ? openChangeAmount() : openSetInitialAmount();
					}}
					className='sm:py-1 text-xs sm:text-base'
				>
					{isInitialAmountSet ? 'Alterar' : 'Definir saldo inicial'}
				</Button>
			</div>
			<p className='text-sm sm:text-base'>
				Saldo total da sua conta, somando os saldos de cada planilhas e com as devidas alterações.
			</p>
		</section>
	);
};
