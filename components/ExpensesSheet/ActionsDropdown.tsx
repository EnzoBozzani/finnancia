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

interface ActionsDropdownProps {
	expense: Expense;
}

export const ActionsDropdown = ({ expense }: ActionsDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full hover:bg-neutral-200 px-2'>
				<RiMoreFill className='text-neutral-600 w-12 h-12' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='-mt-4'>
				<DropdownMenuLabel className='text-center'>{expense.title}</DropdownMenuLabel>
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
						onClick={() => {
							const confirmation = confirm(`Quer mesmo deletar "${expense.title}"?`);
							if (confirmation) {
								//lógica de deletar
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
