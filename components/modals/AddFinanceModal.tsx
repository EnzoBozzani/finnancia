'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

import { useAddFinanceModal } from '@/hooks/useAddFinanceModal';
import { financesService } from '@/services/financesService';
import { months } from '@/constants/months';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { sheetNameToDate } from '@/lib/utils';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent } from '../ui/dialog';
import { SubmitButton } from '../SubmitButton';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export const AddFinanceModal = () => {
	const currentDate = new Date();

	const router = useRouter();

	const isOpen = useAddFinanceModal((state) => state.isOpen);
	const onClose = useAddFinanceModal((state) => state.onClose);
	const sheetName = useAddFinanceModal((state) => state.sheetMonth);

	const width = useScreenWidth();

	const params = useParams<{ sheetId: string }>();

	const sheetDate = sheetNameToDate(sheetName);

	const sheetMonthIsTheCurrentMonth =
		currentDate.getMonth() === sheetDate.getMonth() && currentDate.getFullYear() === sheetDate.getFullYear();

	const [date, setDate] = useState<Date | undefined>(sheetMonthIsTheCurrentMonth ? currentDate : sheetDate);
	const [type, setType] = useState<'PROFIT' | 'EXPENSE'>('PROFIT');
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		const newSheetDate = sheetNameToDate(sheetName);
		const sheetMonthIsTheCurrentMonth =
			currentDate.getMonth() === newSheetDate.getMonth() &&
			currentDate.getFullYear() === newSheetDate.getFullYear();
		setDate(sheetMonthIsTheCurrentMonth ? currentDate : newSheetDate);
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

		if (
			!title ||
			!amount ||
			title === '' ||
			amount === '' ||
			!dateFormatted ||
			!type ||
			(type !== 'PROFIT' && type !== 'EXPENSE')
		) {
			setMessage('Todos os campos são obrigatórios!');
			return;
		}

		const amountFormatted = amount.replace('R$ ', '').replaceAll('.', '').replace(',', '.');

		if (isNaN(Number(amountFormatted)) || amountFormatted === '' || Number(amountFormatted) <= 0) {
			setMessage('Quantia inválida!');
			return;
		}

		const res = await financesService.createFinance({
			title,
			amount: +amountFormatted,
			date: dateFormatted,
			sheetId: params.sheetId,
			type,
		});

		if (res.success) {
			onClose();
			router.refresh();
			toast.success(`Finança "${title}" criada com sucesso!`);
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
						className='space-y-4'
					>
						<h3 className='text-center text-xl font-semibold'>Adicionar finança</h3>
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
						<div className='flex items-center gap-x-2'>
							<Label
								htmlFor='type'
								className='text-lg'
							>
								Tipo:
							</Label>
							<RadioGroup
								defaultValue='PROFIT'
								id='type'
								className='w-full flex items-center justify-center gap-x-6'
								onValueChange={(ev: 'EXPENSE' | 'PROFIT') => setType(ev)}
							>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='PROFIT'
										id='profit'
										className='w-6 h-6'
									/>
									<Label
										htmlFor='profit'
										className='text-base text-green-500'
									>
										Ganho
									</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='EXPENSE'
										id='expense'
										className='w-6 h-6'
									/>
									<Label
										htmlFor='expense'
										className='text-base text-red-500'
									>
										Despesa
									</Label>
								</div>
							</RadioGroup>
						</div>
						{width >= 1024 ? (
							<div>
								<Label className='text-lg'>Dia:</Label>
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
								placeholder={`${
									sheetMonthIsTheCurrentMonth
										? currentDate.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
										: sheetDate.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
								}`}
								mask={'dd'}
								className='flex items-center justify-center gap-x-4 space-y-0 odd:w-[95px] even:flex even:items-center'
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
