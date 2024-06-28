'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useDeleteFinanceModal } from '@/hooks/useDeleteFinanceModal';
import { financesService } from '@/services/financesService';
import { cn } from '@/lib/utils';

import { SubmitButton } from '../SubmitButton';
import { Dialog, DialogContent } from '../ui/dialog';

export const DeleteFinanceModal = () => {
	const router = useRouter();

	const isDark = useIsDarkTheme();

	const isOpen = useDeleteFinanceModal((state) => state.isOpen);
	const onClose = useDeleteFinanceModal((state) => state.onClose);
	const finance = useDeleteFinanceModal((state) => state.finance);

	const onSubmit = async () => {
		if (!finance?.id) return;

		const res = await financesService.deleteFinance(finance.id);

		if (res.error) {
			onClose();
			router.refresh();
			toast.error('Algo deu errado!');
		}

		if (res.success) {
			onClose();
			toast.success(`"${finance.title}" deletado com sucesso!`);
			setTimeout(() => location.reload(), 1500);
		}
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
							Deseja mesmo remover {finance?.type === 'PROFIT' ? 'o ganho' : 'a despesa'} "
							<strong>{finance?.title}</strong>"?
						</h3>

						<SubmitButton type='delete' />
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
