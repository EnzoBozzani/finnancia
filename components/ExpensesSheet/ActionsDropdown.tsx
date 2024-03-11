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
} from '../ui/dropdown-menu';
import { expensesService } from '@/services/expensesService';

interface ActionsDropdownProps {
	expense: Expense;
}

export const ActionsDropdown = ({ expense }: ActionsDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full hover:bg-neutral-200'>
				<RiMoreFill className='text-neutral-800 w-12 h-12' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='-mt-4'>
				<DropdownMenuLabel className='text-center'>Ações</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup
					onClick={() => {
						//lógica para abrir modal de editar
					}}
				>
					<DropdownMenuItem className='py-3 text-lg cursor-pointer flex items-center justify-center'>
						<MdEdit className='w-6 h-6' />
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={async () => {
							const confirmation = confirm(`Quer mesmo deletar "${expense.title}"?`);
							if (confirmation) {
								await expensesService.deleteSheet(expense.id);
								location.reload();
							}
						}}
						className='py-3 text-lg cursor-pointer flex items-center justify-center'
					>
						<FaTrash className='w-6 h-6' />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
