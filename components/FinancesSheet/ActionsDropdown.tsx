'use client';

import { RiMoreFill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { Finance } from '@prisma/client';
import { IoDuplicate } from 'react-icons/io5';

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
import { financesService } from '@/services/financesService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ActionsDropdownProps {
	finance: Finance;
}

export const ActionsDropdown = ({ finance }: ActionsDropdownProps) => {
	const onOpenEdit = useEditFinanceModal((state) => state.onOpen);
	const onOpenDelete = useDeleteFinanceModal((state) => state.onOpen);

	const normalizedFinance = {
		amount: finance.amount,
		categoryId: finance.categoryId || '',
		date: finance.date,
		order: finance.order,
		sheetId: finance.sheetId,
		title: finance.title,
		type: finance.type,
	};

	const router = useRouter();

	const isDark = useIsDarkTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn('lg:bg-transparent rounded-full', isDark ? 'bg-neutral-800' : 'bg-neutral-200')}
			>
				<RiMoreFill
					className={cn('w-8 h-8 lg:w-12 lg:h-12', isDark ? 'text-neutral-100' : 'text-neutral-800 ')}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('-mt-4', isDark && 'bg-neutral-950 text-white border-neutral-700')}>
				<DropdownMenuLabel className='text-center'>Ações</DropdownMenuLabel>
				<DropdownMenuSeparator className={cn(isDark && 'bg-neutral-700')} />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={async () => {
							const res = await financesService.createFinance({
								amount: normalizedFinance.amount,
								categoryId: normalizedFinance.categoryId || '',
								date: normalizedFinance.date,
								sheetId: normalizedFinance.sheetId,
								title: `${normalizedFinance.title} - cópia`,
								type: normalizedFinance.type,
							});

							if (res.success) {
								router.refresh();
								toast.success(`Finança "${finance.title}" duplicada com sucesso!`);
							}

							if (res.error) {
								toast.error('Algo deu errado!');
							}
						}}
						className={cn(
							'py-3 cursor-pointer flex items-center justify-center',
							isDark && 'focus:bg-neutral-800 focus:text-white'
						)}
					>
						<IoDuplicate className='w-6 h-6 mr-2' /> Duplicar
					</DropdownMenuItem>
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
