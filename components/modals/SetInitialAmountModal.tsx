'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useSetInitialAmountModal } from '@/hooks/useSetInitialAmountModal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { usersService } from '@/services/usersService';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { SubmitButton } from '../SubmitButton';

export const SetInitialAmountModal = () => {
	const isDark = useIsDarkTheme();

	const isOpen = useSetInitialAmountModal((state) => state.isOpen);
	const onClose = useSetInitialAmountModal((state) => state.onClose);

	const [message, setMessage] = useState<string | null>(null);

	const onSubmit = async (formData: FormData) => {
		const amount = formData.get('amount') as string;

		if (!amount || amount === '') {
			setMessage('Todos os campos são obrigatórios!');
			return;
		}

		const amountFormatted = Number(
			amount.replace('R$ ', '').replace('R$ ', '').replaceAll('.', '').replace(',', '.')
		);

		if (isNaN(amountFormatted)) {
			setMessage('Campo inválido!');
		}

		const res = await usersService.setInitialAmount(amountFormatted);

		if (res.error) {
			setMessage('Algo deu errado!');
		}

		if (res.success) {
			toast.success('Saldo definido com sucesso!');
			location.reload();
		}

		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent
				className={cn(
					'sm:max-w-[425px] border-none outline-none',
					isDark ? 'bg-neutral-900 text-white' : 'bg-white'
				)}
			>
				<form
					action={onSubmit}
					className='space-y-3'
				>
					<h3 className='text-center text-xl font-semibold'>Definir saldo</h3>
					<p className='my-6 text-neutral-500 text-center'>
						Antes de continuar, defina o saldo inicial de sua conta. Feito isso, você poderá visualizar
						sempre o saldo total de suas finanças <strong>(pode ser negativo, positivo ou 0)</strong>.
					</p>
					<FormGroup
						id='amount'
						label='Saldo inicial:'
						mask='R$ #.##0,00'
						placeholder='R$ XXX,XX'
						inputMode='decimal'
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
	);
};
