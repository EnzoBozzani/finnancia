'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { dayExistsInMonth, cn, currencyFormat, financeStringToDate } from '@/lib/utils';
import { financesService } from '@/services/financesService';
import { months } from '@/constants/months';
import { useEditFinanceModal } from '@/hooks/useEditFinanceModal';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent } from '../ui/dialog';
import { SubmitButton } from '../SubmitButton';
import { Label } from '../ui/label';

export const EditFinanceModal = () => {
	const router = useRouter();

	const isDark = useIsDarkTheme();

	const isOpen = useEditFinanceModal((state) => state.isOpen);
	const onClose = useEditFinanceModal((state) => state.onClose);
	const finance = useEditFinanceModal((state) => state.finance);
	const width = useScreenWidth();

	const [date, setDate] = useState<Date | undefined>(undefined);
	const [message, setMessage] = useState<string | null>(null);

	const financeDate = financeStringToDate(finance?.date);

	useEffect(() => {
		const financeDate = financeStringToDate(finance?.date);
		setDate(financeDate);
	}, [isOpen]);

	if (!finance) return null;

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

			if (
				isNaN(day) ||
				!dayExistsInMonth(`${day}/${months[financeDate.getMonth()]}/${financeDate.getFullYear()}`)
			) {
				setMessage('Dia inválido!');
				return;
			}

			dateFormatted = `${day.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}/${
				months[financeDate.getMonth()]
			}/${financeDate.getFullYear()}`;
		} else {
			if (!date) {
				setMessage('Todos os campos são obrigatórios!');
				return;
			}

			if (date.getMonth() !== financeDate.getMonth()) {
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

		if (title === finance.title && Number(amountFormatted) === finance.amount && dateFormatted === finance.date) {
			onClose();
			return;
		}

		const res = await financesService.editFinance(finance.id, {
			title,
			amount: +amountFormatted,
			date: dateFormatted,
		});

		if (res.success) {
			onClose();
			router.refresh();
			toast.success('Finança editada com sucesso!');
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
						'sm:max-w-[765px] border-none outline-none',
						isDark ? 'bg-neutral-900 text-white' : 'bg-white'
					)}
				>
					<form
						action={onSubmit}
						className='space-y-4'
					>
						{width >= 768 ? (
							<div className='grid grid-cols-2'>
								<div className='flex flex-col gap-y-6'>
									<h3 className='text-center text-xl font-semibold'>
										Editar {finance.type === 'PROFIT' ? 'Ganho' : 'Despesa'}
									</h3>
									<FormGroup
										id='title'
										label='Título'
										initialValue={finance.title}
									/>
									<FormGroup
										id='amount'
										label='Quantia'
										mask='R$ #.##0,00'
										initialValue={currencyFormat(finance.amount)}
									/>
								</div>
								<div className='flex flex-col justify-center items-center'>
									<div>
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
												modifiersStyles={{
													selected: {
														backgroundColor: '#16a34a',
													},
												}}
												className={cn(
													'mx-auto w-fit flex justify-center items-center rounded-md border shadow',
													isDark && 'border-neutral-600'
												)}
											/>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className='space-y-4'>
								<h3 className='text-center text-xl font-semibold'>
									Editar {finance.type === 'PROFIT' ? 'Ganho' : 'Despesa'}
								</h3>
								<FormGroup
									id='title'
									label='Título'
									initialValue={finance.title}
								/>
								<FormGroup
									id='amount'
									label='Quantia'
									mask='R$ #.##0,00'
									initialValue={currencyFormat(finance.amount)}
								/>
								<FormGroup
									id='date'
									label='Dia:'
									placeholder={`${finance.order.toLocaleString('pt-BR', {
										minimumIntegerDigits: 2,
									})}`}
									mask={'dd'}
									initialValue={finance.order.toLocaleString('pt-BR', {
										minimumIntegerDigits: 2,
									})}
									className='flex items-center justify-center gap-x-4 space-y-0 even:w-[95px] even:flex even:items-center'
								/>
							</div>
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
