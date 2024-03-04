'use client';

import { useRef, useState, useEffect } from 'react';

import { FormGroup } from './FormGroup';
import { FormMessage } from './FormMessage';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { PlusIcon } from '@radix-ui/react-icons';

export const AddExpenseModal = () => {
	const currentDate = new Date();

	const titleRef = useRef<HTMLInputElement | null>(null);
	const amountRef = useRef<HTMLInputElement | null>(null);
	const [date, setDate] = useState<Date | undefined>(currentDate);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		if (date?.getMonth() !== currentDate.getMonth()) {
			setMessage('Selecione uma data dentro do mês atual!');
		}
	}, [date]);

	const onSubmit = () => {};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					role='button'
					className='p-3 flex items-center hover:bg-neutral-200'
				>
					<PlusIcon className='w-8 h-8 mr-2' />
					Adicionar despesa
				</div>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form
					onSubmit={onSubmit}
					className='space-y-3'
				>
					<h3 className='text-center text-xl font-semibold'>Adicionar despesa</h3>
					<FormGroup
						id='title'
						inputRef={titleRef}
						label='Título'
					/>
					<FormGroup
						id='amount'
						inputRef={amountRef}
						label='Quantia'
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
						setMessage={setMessage}
						type='error'
					/>
					<div className='flex items-center justify-center'>
						<Button
							size={'lg'}
							type='submit'
						>
							Adicionar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
