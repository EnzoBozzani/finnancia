'use client';

import { PlusIcon } from '@radix-ui/react-icons';

import { useAddFinanceModal } from '@/hooks/useAddFinanceModal';

export const AddFinanceButton = ({ sheetMonth }: { sheetMonth: string }) => {
	const onOpen = useAddFinanceModal((state) => state.onOpen);

	return (
		<div
			role='button'
			onClick={() => onOpen(sheetMonth)}
			className='cursor-pointer p-4 fixed bottom-6 right-2 md:right-6 rounded-full bg-green-600 hover:bg-green-700 text-white'
		>
			<PlusIcon className='h-8 w-8 sm:h-10 sm:w-10' />
		</div>
	);
};
