'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { useAddExpenseModal } from '@/hooks/useAddExpenseModal';
import { PlusIcon } from '@radix-ui/react-icons';

export const AddExpenseRow = () => {
	const onOpen = useAddExpenseModal((state) => state.onOpen);

	return (
		<TableRow className='bg-green-200 hover:bg-green-300 cursor-pointer'>
			<TableCell
				onClick={() => onOpen()}
				colSpan={4}
			>
				<button className='w-full flex items-center justify-center'>
					<PlusIcon className='h-6 w-6 mr-2' /> Adicionar Despesa
				</button>
			</TableCell>
		</TableRow>
	);
};
