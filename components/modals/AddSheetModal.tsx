'use client';

import { useEffect, useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAddSheetModal } from '@/hooks/useAddSheetModal';
import { sheetsService } from '@/services/sheetsService';

import { FormMessage } from '../FormMessage';
import { FormGroup } from '../FormGroup';
import { SubmitButton } from '../SubmitButton';
import { useRouter } from 'next/navigation';

export const AddSheetModal = () => {
	const currentDate = new Date();

	const router = useRouter();

	const isOpen = useAddSheetModal((state) => state.isOpen);
	const onClose = useAddSheetModal((state) => state.onClose);

	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => setMessage(null), [setMessage, isOpen]);

	const onSubmit = async (formData: FormData) => {
		setMessage(null);

		const date = formData.get('date') as string;

		if (!date || date.length !== 7) {
			setMessage('Data inválida!');
			return;
		}

		const month = Number(date.slice(0, 2));
		const year = Number(date.slice(3, date.length));

		if (isNaN(year) || isNaN(month) || month < 0 || month > 31) {
			setMessage('Data inválida!');
			return;
		}

		if (year < 2010 || year > currentDate.getFullYear() + 1) {
			setMessage(`Só é possível adicionar planilhas para datas entre 2010 e ${currentDate.getFullYear() + 1}`);
			return;
		}

		const res = await sheetsService.createSheet({ year, month });

		if (res.error) {
			setMessage(res.error);
			return;
		}

		if (res.success) {
			onClose();
			router.push(`/dashboard/${res.sheetId}`);
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
						<h3 className='text-center text-xl font-semibold'>Adicionar planilha</h3>
						<FormGroup
							id='date'
							label='Mês da planilha:'
							initialValue={`${(currentDate.getMonth() + 1).toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}/${currentDate.getFullYear()}`}
							mask='mm/yyyy'
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
