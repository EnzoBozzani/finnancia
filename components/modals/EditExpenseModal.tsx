'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { expensesService } from '@/services/expensesService';
import { monthNameToMonthNumber, months } from '@/constants/months';
import { useEditExpenseModal } from '@/hooks/useEditExpenseModal';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent } from '../ui/dialog';
import { SubmitButton } from '../SubmitButton';
import { Label } from '../ui/label';
import { expenseStringToDate } from '@/lib/utils';

export const EditExpenseModal = () => {
	const isOpen = useEditExpenseModal((state) => state.isOpen);
	const onClose = useEditExpenseModal((state) => state.onClose);
	const expense = useEditExpenseModal((state) => state.expense);
	const width = useScreenWidth();

	const [date, setDate] = useState<Date | undefined>(undefined);
	const [message, setMessage] = useState<string | null>(null);

	const expenseDate = expenseStringToDate(expense?.date);

	useEffect(() => {
		setDate(expenseDate);
	}, [isOpen]);

	if (!expense) return null;

	const onSubmit = async (formData: FormData) => {
		setMessage(null);

		const title = formData.get('title') as string;
		const amount = formData.get('amount') as string;

		let dateFormatted;

		if (width <= 700) {
			const dateInMobile = formData.get('date') as string;

			if (!dateInMobile || dateInMobile === '') {
				setMessage('Todos os campos são obrigatórios!');
				return;
			}

			if (dateInMobile.length !== 2 && dateInMobile.length !== 1) {
				setMessage('Dia inválido!');
				return;
			}

			const day = Number(dateInMobile);

			if (isNaN(day)) {
				setMessage('Dia inválido!');
				return;
			}

			dateFormatted = `${day.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}/${
				months[expenseDate.getMonth()]
			}/${expenseDate.getFullYear()}`;
		} else {
			if (!date) {
				setMessage('Todos os campos são obrigatórios!');
				return;
			}

			if (date.getMonth() !== expenseDate.getMonth()) {
				setMessage('Data inválida!');
				return;
			}

			dateFormatted = `${date.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}/${
				months[date.getMonth()]
			}/${date.getFullYear()}`;
		}

		if (!title || !amount || title === '' || amount === '' || !dateFormatted) {
			setMessage('Todos os campos são obrigatórios!');
			return;
		}

		const amountFormatted = amount.replace('R$ ', '').replace('R$ ', '').replaceAll('.', '').replace(',', '.');

		if (isNaN(Number(amountFormatted)) || amountFormatted === '' || Number(amountFormatted) <= 0) {
			setMessage('Quantia inválida!');
			return;
		}

		if (title === expense.title && Number(amountFormatted) === expense.amount && dateFormatted === expense.date) {
			onClose();
			return;
		}

		const res = await expensesService.editExpense(expense.id, {
			title,
			amount: +amountFormatted,
			date: dateFormatted,
		});

		if (res.success) {
			window.location.reload();
		}

		if (res.error) {
			setMessage(res.error);
		}
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
						<h3 className='text-center text-xl font-semibold'>Editar despesa</h3>
						<FormGroup
							id='title'
							label='Título'
							initialValue={expense.title}
						/>
						<FormGroup
							id='amount'
							label='Quantia'
							mask='R$ #.##0,00'
							initialValue={expense.amount.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						/>
						{width >= 700 ? (
							!!date && (
								<div>
									<Label className='text-lg text-center'>Dia:</Label>
									<Calendar
										month={date}
										fromMonth={date}
										toMonth={date}
										disableNavigation
										lang='pt'
										mode='single'
										selected={date}
										onSelect={setDate}
										className='mx-auto w-fit flex justify-center items-center rounded-md border shadow'
									/>
								</div>
							)
						) : (
							<FormGroup
								id='date'
								label='Dia:'
								placeholder={`${expenseDate.getDate().toLocaleString('pt-BR', {
									minimumIntegerDigits: 2,
								})}`}
								mask={'dd'}
								initialValue={expenseDate.getDate().toLocaleString('pt-BR', {
									minimumIntegerDigits: 2,
								})}
								className='flex items-center justify-center gap-x-4 space-y-0 even:w-[95px] even:flex even:items-center'
							/>
						)}
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
