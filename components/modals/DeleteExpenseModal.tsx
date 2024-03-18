'use client';

import { toast } from 'sonner';

import { useDeleteExpenseModal } from '@/hooks/useDeleteExpenseModal';
import { expensesService } from '@/services/expensesService';

import { SubmitButton } from '../SubmitButton';
import { Dialog, DialogContent } from '../ui/dialog';
import { useRouter } from 'next/navigation';

export const DeleteExpenseModal = () => {
	const router = useRouter();

	const isOpen = useDeleteExpenseModal((state) => state.isOpen);
	const onClose = useDeleteExpenseModal((state) => state.onClose);
	const expense = useDeleteExpenseModal((state) => state.expense);

	const onSubmit = async () => {
		if (!expense?.id) return;

		const res = await expensesService.deleteExpense(expense.id);

		if (res.error) {
			onClose();
			router.refresh();
			toast.error('Algo deu errado!');
		}

		if (res.success) {
			onClose();
			router.refresh();
			toast.success(`"${expense.title}" deletado com sucesso!`);
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
							Deseja mesmo remover a despesa "<strong>{expense?.title}</strong>"?
						</h3>

						<SubmitButton type='delete' />
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
