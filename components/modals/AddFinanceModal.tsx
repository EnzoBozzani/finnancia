'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { Category } from '@prisma/client';

import { useAddFinanceModal } from '@/hooks/useAddFinanceModal';
import { financesService } from '@/services/financesService';
import { months } from '@/constants/months';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { cn, dayExistsInMonth, sheetNameToDate } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent } from '../ui/dialog';
import { SubmitButton } from '../SubmitButton';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { SelectCategory } from '../SelectCategory';

export const AddFinanceModal = () => {
	const currentDate = new Date();

	const isOpen = useAddFinanceModal((state) => state.isOpen);
	const onClose = useAddFinanceModal((state) => state.onClose);
	const sheetName = useAddFinanceModal((state) => state.sheetMonth);

	const width = useScreenWidth();

	const params = useParams<{ sheetId: string }>();

	const isDark = useIsDarkTheme();

	const sheetDate = sheetNameToDate(sheetName);

	const sheetMonthIsTheCurrentMonth =
		currentDate.getMonth() === sheetDate.getMonth() && currentDate.getFullYear() === sheetDate.getFullYear();

	const [date, setDate] = useState<Date | undefined>(sheetMonthIsTheCurrentMonth ? currentDate : sheetDate);
	const [type, setType] = useState<'PROFIT' | 'EXPENSE'>('PROFIT');
	const [message, setMessage] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

	useEffect(() => {
		const newSheetDate = sheetNameToDate(sheetName);
		const sheetMonthIsTheCurrentMonth =
			currentDate.getMonth() === newSheetDate.getMonth() &&
			currentDate.getFullYear() === newSheetDate.getFullYear();
		setDate(sheetMonthIsTheCurrentMonth ? currentDate : newSheetDate);
		setType('PROFIT');
	}, [isOpen, setDate]);

	const onSubmit = async (formData: FormData) => {
		setMessage(null);

		const title = formData.get('title') as string;
		const amount = formData.get('amount') as string;

		let dateFormatted;

		if (width <= 768) {
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

			if (isNaN(day) || !dayExistsInMonth(`${day}/${months[sheetDate.getMonth()]}/${sheetDate.getFullYear()}`)) {
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
			categoryId: selectedCategory?.id || '',
		});

		if (res.success) {
			onClose();
			toast.success(`Finança "${title}" criada com sucesso!`);
			setTimeout(() => location.reload(), 1500);
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
				<DialogContent
					className={cn(
						'md:max-w-[765px] border-none outline-none',
						isDark ? 'bg-neutral-900 text-white' : 'bg-white'
					)}
				>
					<form
						action={onSubmit}
						className='space-y-4'
					>
						{width <= 768 ? (
							<div className='space-y-4'>
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
									inputMode='decimal'
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
												className={cn(
													'w-6 h-6',
													isDark && 'odd:odd:text-white border border-white'
												)}
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
												className={cn(
													'w-6 h-6',
													isDark && 'odd:odd:text-white border border-white'
												)}
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
								<SelectCategory
									setSelectedCategory={setSelectedCategory}
									optional
									triggerClassName='text-sm sm:text-base w-full'
									hasNoCategory
								/>
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
									inputMode='numeric'
								/>
							</div>
						) : (
							<div className='grid grid-cols-2'>
								<div className='flex flex-col gap-y-5'>
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
													className={cn(
														'w-6 h-6',
														isDark && 'odd:odd:text-white border border-white'
													)}
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
													className={cn(
														'w-6 h-6',
														isDark && 'odd:odd:text-white border border-white'
													)}
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
									<SelectCategory
										setSelectedCategory={setSelectedCategory}
										optional
										triggerClassName='text-sm sm:text-base w-full'
										hasNoCategory
									/>
								</div>
								<div className='flex flex-col justify-center items-center'>
									<div>
										<Label className='text-lg'>Dia:</Label>
										<Calendar
											formatters={{
												formatCaption: (caption: Date) => {
													return `${months[caption.getMonth()]} de ${caption.getFullYear()}`;
												},
												formatWeekdayName: (weekdayName: Date) => {
													return `${
														weekdayName
															.toLocaleDateString('pt-BR', {
																weekday: 'long',
															})
															.toUpperCase()[0]
													}`;
												},
											}}
											fromMonth={date}
											toMonth={date}
											month={date}
											disableNavigation
											mode='single'
											selected={date}
											onSelect={setDate}
											className={cn(
												'mx-auto w-fit flex justify-center items-center rounded-md border shadow',
												isDark && 'border-neutral-600'
											)}
											modifiersStyles={{
												selected: {
													backgroundColor: '#16a34a',
												},
											}}
										/>
									</div>
								</div>
							</div>
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
