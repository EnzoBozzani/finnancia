'use client';

import { RiMoreFill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { Expense } from '@prisma/client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useEditExpenseModal } from '@/hooks/useEditExpenseModal';
import { useDeleteExpenseModal } from '@/hooks/useDeleteExpenseModal';

interface ActionsDropdownProps {
	expense: Expense;
}

export const ActionsDropdown = ({ expense }: ActionsDropdownProps) => {
	const onOpenEdit = useEditExpenseModal((state) => state.onOpen);
	const onOpenDelete = useDeleteExpenseModal((state) => state.onOpen);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='bg-neutral-200 lg:bg-transparent rounded-full hover:bg-neutral-200'>
				<RiMoreFill className='text-neutral-800 w-8 h-8 lg:w-12 lg:h-12' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='-mt-4'>
				<DropdownMenuLabel className='text-center'>Ações</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							onOpenEdit(expense);
						}}
						className='py-3 cursor-pointer flex items-center justify-center'
					>
						<MdEdit className='w-6 h-6 mr-2' /> Editar
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							onOpenDelete(expense);
						}}
						className='py-3 cursor-pointer flex items-center justify-center'
					>
						<FaTrash className='w-6 h-6 mr-2' /> Remover
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
