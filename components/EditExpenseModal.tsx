'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { expensesService } from '@/services/expensesService';
import { months } from '@/constants/months';
import { useEditExpenseModal } from '@/hooks/useEditExpenseModal';

import { FormGroup } from './FormGroup';
import { FormMessage } from './FormMessage';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent } from './ui/dialog';
import { SubmitButton } from './SubmitButton';

export const EditExpenseModal = () => {
	const params = useParams<{ sheetId: string }>();

	const isOpen = useEditExpenseModal((state) => state.isOpen);
	const onClose = useEditExpenseModal((state) => state.onClose);
	const expense = useEditExpenseModal((state) => state.expense);

	//COMO CONVERTER A DATA DO EXPENSE PARA UMA DATA FORMATO Date?
	const currentDate = new Date();

	const [date, setDate] = useState<Date | undefined>(currentDate);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		if (date?.getMonth() !== currentDate.getMonth()) {
			setMessage('Selecione uma data dentro do mês atual!');
		}
	}, [date]);

	//MUDAR TODA ESSA LÓGICA
	const onSubmit = async (formData: FormData) => {
		setMessage(null);

		const title = formData.get('title') as string;
		const amount = formData.get('amount') as string;

		if (!title || !amount || title === '' || amount === '' || !date) {
			setMessage('Todos os campos são obrigatórios!');
			return;
		}

		if (date.getMonth() !== currentDate.getMonth()) {
			setMessage('Data inválida!');
			return;
		}

		const amountFormatted = amount.replace('R$ ', '').replaceAll('.', '').replace(',', '.');

		const dateFormatted = `${date.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}/${
			months[date.getMonth()]
		}/${date.getFullYear()}`;

		if (isNaN(Number(amountFormatted)) || amountFormatted === '') {
			setMessage('Quantia inválida!');
			return;
		}

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

	//FORMATAÇÃO DOS INPUTS
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
						<h3 className='text-center text-xl font-semibold'>Editar despesa</h3>
						<FormGroup
							id='title'
							label='Título'
							initialValue={expense?.title}
						/>
						<FormGroup
							id='amount'
							label='Quantia'
							mask='R$ #.##0,00'
							initialValue={expense?.amount.toString()}
						/>
						<Calendar
							disableNavigation
							lang='pt'
							mode='single'
							selected={date}
							onSelect={setDate}
							className='mx-auto w-fit flex justify-center items-center rounded-md border shadow'
						/>
						<FormMessage
							message={message}
							type='error'
							className='mx-auto'
						/>
						<SubmitButton type='edit' />
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
