'use client';

import { useDeleteExpenseModal } from '@/hooks/useDeleteExpenseModal';

import { SubmitButton } from '../SubmitButton';
import { Dialog, DialogContent } from '../ui/dialog';
import { expensesService } from '@/services/expensesService';

export const DeleteExpenseModal = () => {
	const isOpen = useDeleteExpenseModal((state) => state.isOpen);
	const onClose = useDeleteExpenseModal((state) => state.onClose);
	const expense = useDeleteExpenseModal((state) => state.expense);

	const onSubmit = async () => {
		if (!expense?.id) return;
		await expensesService.deleteExpense(expense.id);
		location.reload();
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
