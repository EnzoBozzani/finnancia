'use client';

import { RiMoreFill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { Finance } from '@prisma/client';

import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useEditFinanceModal } from '@/hooks/useEditFinanceModal';
import { useDeleteFinanceModal } from '@/hooks/useDeleteFinanceModal';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

interface ActionsDropdownProps {
	finance: Finance;
}

export const ActionsDropdown = ({ finance }: ActionsDropdownProps) => {
	const onOpenEdit = useEditFinanceModal((state) => state.onOpen);
	const onOpenDelete = useDeleteFinanceModal((state) => state.onOpen);

	const isDark = useIsDarkTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn('lg:bg-transparent rounded-full', isDark ? 'bg-black' : 'bg-white')}>
				<RiMoreFill
					className={cn('w-8 h-8 lg:w-12 lg:h-12', isDark ? 'text-neutral-100' : 'text-neutral-800 ')}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('-mt-4', isDark && 'bg-neutral-950 text-white')}>
				<DropdownMenuLabel className='text-center'>Ações</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							onOpenEdit(finance);
						}}
						className={cn(
							'py-3 cursor-pointer flex items-center justify-center',
							isDark && 'focus:bg-neutral-800 focus:text-white'
						)}
					>
						<MdEdit className='w-6 h-6 mr-2' /> Editar
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							onOpenDelete(finance);
						}}
						className={cn(
							'py-3 cursor-pointer flex items-center justify-center',
							isDark && 'focus:bg-neutral-800 focus:text-white'
						)}
					>
						<FaTrash className='w-6 h-6 mr-2' /> Remover
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
