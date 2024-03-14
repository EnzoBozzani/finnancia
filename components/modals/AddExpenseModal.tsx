'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useAddExpenseModal } from '@/hooks/useAddExpenseModal';
import { expensesService } from '@/services/expensesService';
import { months } from '@/constants/months';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent } from '../ui/dialog';
import { SubmitButton } from '../SubmitButton';
import { Label } from '../ui/label';

export const AddExpenseModal = () => {
	const currentDate = new Date();

	const params = useParams<{ sheetId: string }>();

	const [date, setDate] = useState<Date | undefined>(currentDate);
	const [message, setMessage] = useState<string | null>(null);

	const isOpen = useAddExpenseModal((state) => state.isOpen);
	const onClose = useAddExpenseModal((state) => state.onClose);

	useEffect(() => {
		if (date?.getMonth() !== currentDate.getMonth()) {
			setMessage('Selecione uma data dentro do mês atual!');
		}
	}, [date]);

	const onSubmit = async (formData: FormData) => {
		setMessage(null);

		const title = formData.get('title') as string;
		const amount = formData.get('amount') as string;
		const dateInMobile = formData.get('date') as string;

		if (!dateInMobile) {
			console.log('OIIII');
		}

		// if (!title || !amount || title === '' || amount === '' || !date) {
		// 	setMessage('Todos os campos são obrigatórios!');
		// 	return;
		// }

		// if (date.getMonth() !== currentDate.getMonth()) {
		// 	setMessage('Data inválida!');
		// 	return;
		// }

		// const amountFormatted = amount.replace('R$ ', '').replaceAll('.', '').replace(',', '.');

		// const dateFormatted = `${date.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}/${
		// 	months[date.getMonth()]
		// }/${date.getFullYear()}`;

		// if (isNaN(Number(amountFormatted)) || amountFormatted === '' || Number(amountFormatted) <= 0) {
		// 	setMessage('Quantia inválida!');
		// 	return;
		// }

		// const res = await expensesService.createExpense({
		// 	title,
		// 	amount: +amountFormatted,
		// 	date: dateFormatted,
		// 	sheetId: params.sheetId,
		// });

		// if (res.success) {
		// 	window.location.reload();
		// }

		// if (res.error) {
		// 	setMessage(res.error);
		// }
	};

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={onClose}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<form
						action={onSubmit}
						className='space-y-3'
					>
						<h3 className='text-center text-xl font-semibold'>Adicionar despesa</h3>
						<FormGroup
							id='title'
							label='Título:'
						/>
						<FormGroup
							id='amount'
							label='Quantia:'
							mask='R$ #.##0,00'
						/>
						<div className='hidden sm:block'>
							<Label className='text-lg text-center'>Data:</Label>
							<Calendar
								disableNavigation
								lang='pt'
								mode='single'
								selected={date}
								onSelect={setDate}
								className='mx-auto w-fit flex justify-center items-center rounded-md border shadow'
							/>
						</div>
						<FormGroup
							id='date'
							label='Data:'
							placeholder={`${currentDate.getDate()}/${(currentDate.getMonth() + 1).toLocaleString(
								'pt-BR',
								{
									minimumIntegerDigits: 2,
								}
							)}/${currentDate.getFullYear()}`}
							mask='dd/mm/yyyy'
							className='block sm:hidden'
						/>
						<FormMessage
							message={message}
							type='error'
							className='mx-auto'
						/>
						<SubmitButton type='add' />
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
