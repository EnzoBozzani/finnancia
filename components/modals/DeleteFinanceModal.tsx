'use client';

import { toast } from 'sonner';

import { useDeleteFinanceModal } from '@/hooks/useDeleteFinanceModal';
import { financesService } from '@/services/financesService';

import { SubmitButton } from '../SubmitButton';
import { Dialog, DialogContent } from '../ui/dialog';
import { useRouter } from 'next/navigation';

export const DeleteFinanceModal = () => {
	const router = useRouter();

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
			router.refresh();
			toast.success(`"${finance.title}" deletado com sucesso!`);
		}
	};

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={onClose}
			>
				<DialogContent className='sm:max-w-[425px] p-6'>
					<form
						action={onSubmit}
						className='space-y-6 mt-6'
					>
						<h3 className='text-justify text-xl'>
							Deseja mesmo remover a finança "<strong>{finance?.title}</strong>"?
						</h3>

						<SubmitButton type='delete' />
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
