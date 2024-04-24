'use client';

import { useState } from 'react';

import { useSetInitialAmountModal } from '@/hooks/useSetInitialAmountModal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

import { FormGroup } from '../FormGroup';
import { FormMessage } from '../FormMessage';
import { SubmitButton } from '../SubmitButton';

export const SetInitialAmountModal = () => {
	const isDark = useIsDarkTheme();

	const isOpen = useSetInitialAmountModal((state) => state.isOpen);
	const onOpen = useSetInitialAmountModal((state) => state.onOpen);
	const onClose = useSetInitialAmountModal((state) => state.onClose);

	const [message, setMessage] = useState<string | null>(null);

	const onSubmit = () => {};

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
						Defina o saldo inicial de sua conta, ou seja, a soma de seu saldo em todas suas contas
						bancárias. Feito isso, você poderá visualizar sempre o saldo total de suas finanças.
					</p>
					<FormGroup
						id='date'
						label='Saldo inicial:'
						mask='R$ #.##0,00'
						placeholder='R$ XXX,XX'
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
