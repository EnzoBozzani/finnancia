'use client';

import { PlusIcon } from '@radix-ui/react-icons';

import { useAddFinanceModal } from '@/hooks/useAddFinanceModal';

export const AddFinanceButton = ({ sheetMonth }: { sheetMonth: string }) => {
	const onOpen = useAddFinanceModal((state) => state.onOpen);

	return (
		<div
			role='button'
			onClick={() => onOpen(sheetMonth)}
			className='cursor-pointer p-4 fixed bottom-6 right-6 rounded-full bg-green-600 hover:bg-green-700 text-white'
		>
			<PlusIcon className='h-10 w-10' />
		</div>
	);
};
