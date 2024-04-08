'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useDeleteSheetModal } from '@/hooks/useDeleteSheetModal';
import { cn } from '@/lib/utils';

import { SubmitButton } from '../SubmitButton';
import { Dialog, DialogContent } from '../ui/dialog';

export const DeleteSheetModal = () => {
	const router = useRouter();

	const isDark = useIsDarkTheme();

	const isOpen = useDeleteSheetModal((state) => state.isOpen);
	const onClose = useDeleteSheetModal((state) => state.onClose);
	const sheet = useDeleteSheetModal((state) => state.sheet);

	const onSubmit = async () => {
		// if (!sheet?.id) return;
		// const res = await sheetssService.deleteSheet(sheet.id);
		// if (res.error) {
		// 	onClose();
		// 	router.refresh();
		// 	toast.error('Algo deu errado!');
		// }
		// if (res.success) {
		// 	onClose();
		// 	redirect("/dashboard")
		// }
	};

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={onClose}
			>
				<DialogContent
					className={cn(
						'sm:max-w-[425px] p-6 border-none outline-none',
						isDark ? 'bg-neutral-900 text-white' : 'bg-white'
					)}
				>
					<form
						action={onSubmit}
						className='space-y-6 mt-6'
					>
						<h3 className='text-justify text-xl'>
							Deseja mesmo remover a planilha "<strong>{sheet?.name}</strong>"?
						</h3>

						<SubmitButton type='delete' />
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
