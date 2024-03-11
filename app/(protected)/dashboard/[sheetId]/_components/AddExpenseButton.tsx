'use client';

import { PlusIcon } from '@radix-ui/react-icons';

import { useAddExpenseModal } from '@/hooks/useAddExpenseModal';

export const AddExpenseButton = () => {
	const onOpen = useAddExpenseModal((state) => state.onOpen);

	return (
		<div
			role='button'
			onClick={() => onOpen()}
			className='cursor-pointer p-4 fixed bottom-6 right-6 rounded-full bg-green-600 hover:bg-green-700 text-white'
		>
			<PlusIcon className='h-10 w-10' />
		</div>
	);
};
