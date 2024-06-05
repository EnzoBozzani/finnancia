'use client';

import { PlusIcon } from '@radix-ui/react-icons';

import { useAddFinanceModal } from '@/hooks/useAddFinanceModal';
import { useProModal } from '@/hooks/useProModal';
import { MAX_FINANCES_FOR_FREE } from '@/constants/subscription';

type AddFinanceButtonProps = {
	sheetMonth: string;
	financesCount: number;
	hasActiveSubscription: boolean;
};

export const AddFinanceButton = ({ sheetMonth, financesCount, hasActiveSubscription }: AddFinanceButtonProps) => {
	const onOpen = useAddFinanceModal((state) => state.onOpen);

	const openProModal = useProModal((state) => state.onOpen);

	return (
		<div
			role='button'
			onClick={() => {
				if (!hasActiveSubscription && financesCount >= MAX_FINANCES_FOR_FREE) {
					openProModal(
						'Vixe! Parece que você atingiu o limite de finanças para este mês. Para continuar adicionando, você pode assinar o Finnancia Pro por apenas R$ 9,90 ao mês e ter acesso a isso e mais:'
					);
				} else {
					onOpen(sheetMonth);
				}
			}}
			className='cursor-pointer p-4 fixed bottom-6 right-2 md:right-6 rounded-full bg-green-600 hover:bg-green-700 text-white'
		>
			<PlusIcon className='h-8 w-8 sm:h-10 sm:w-10' />
		</div>
	);
};
