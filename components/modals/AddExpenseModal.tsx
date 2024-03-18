'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useAddExpenseModal } from '@/hooks/useAddExpenseModal';
import { expensesService } from '@/services/expensesService';
import { Month, monthNameToMonthNumber, months } from '@/constants/months';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent } from '../ui/dialog';
import { SubmitButton } from '../SubmitButton';
import { Label } from '../ui/label';
import { sheetNameToDate } from '@/lib/utils';

export const AddExpenseModal = () => {
	const isOpen = useAddExpenseModal((state) => state.isOpen);
	const onClose = useAddExpenseModal((state) => state.onClose);
	const sheetName = useAddExpenseModal((state) => state.sheetMonth);

	const width = useScreenWidth();

	const params = useParams<{ sheetId: string }>();

	const sheetDate = sheetNameToDate(sheetName);

	const [date, setDate] = useState<Date | undefined>(sheetDate);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		const newSheetDate = sheetNameToDate(sheetName);
		setDate(newSheetDate);
	}, [isOpen, setDate]);

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
				months[sheetDate.getMonth()]
			}/${sheetDate.getFullYear()}`;
		} else {
			if (!date) {
				setMessage('Todos os campos são obrigatórios!');
				return;
			}

			if (date.getMonth() !== sheetDate.getMonth()) {
				setMessage('Dia deve ser do mês da planilha!');
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

		const amountFormatted = amount.replace('R$ ', '').replaceAll('.', '').replace(',', '.');

		if (isNaN(Number(amountFormatted)) || amountFormatted === '' || Number(amountFormatted) <= 0) {
			setMessage('Quantia inválida!');
			return;
		}

		const res = await expensesService.createExpense({
			title,
			amount: +amountFormatted,
			date: dateFormatted,
			sheetId: params.sheetId,
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
						<h3 className='text-center text-xl font-semibold'>Adicionar despesa</h3>
						<FormGroup
							id='title'
							label='Título:'
							placeholder='Ida ao mercado'
						/>
						<FormGroup
							id='amount'
							label='Quantia:'
							mask='R$ #.##0,00'
							placeholder='R$ XXX,XX'
						/>
						{width >= 700 ? (
							<div>
								<Label className='text-lg text-center'>Dia:</Label>
								<Calendar
									fromMonth={date}
									toMonth={date}
									month={date}
									disableNavigation
									lang='pt'
									mode='single'
									selected={date}
									onSelect={setDate}
									className='mx-auto w-fit flex justify-center items-center rounded-md border shadow'
								/>
							</div>
						) : (
							<FormGroup
								id='date'
								label='Dia:'
								placeholder={`${sheetDate
									.getDate()
									.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`}
								mask={'dd'}
								className='flex items-center justify-center gap-x-4 space-y-0 even:w-[95px] even:flex even:items-center'
							/>
						)}
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