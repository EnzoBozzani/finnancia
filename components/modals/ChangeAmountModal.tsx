'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { VscLoading } from 'react-icons/vsc';

import { usersService } from '@/services/usersService';
import { cn } from '@/lib/utils';
import { useChangeAmountModal } from '@/hooks/useChangeAmountModal';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FormMessage } from '@/components/FormMessage';
import { Button } from '@/components/ui/button';
import { FormGroup } from '@/components/FormGroup';

export const ChangeAmountModal = () => {
	const isDark = useIsDarkTheme();

	const isOpen = useChangeAmountModal((state) => state.isOpen);
	const onClose = useChangeAmountModal((state) => state.onClose);

	const [message, setMessage] = useState<string | null>(null);

	const [pending, startTransition] = useTransition();

	const onSubmit = (formData: FormData) => {
		startTransition(async () => {
			setMessage(null);
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

			const res = await usersService.changeAmount(amountFormatted);

			if (res.error) {
				setMessage('Algo deu errado!');
			}

			if (res.success) {
				toast.success('Saldo definido com sucesso!');
				location.reload();
			}

			onClose();
		});
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
					<h3 className='text-center text-xl font-semibold'>Alterar saldo</h3>
					<p className='my-6 text-neutral-500 text-center'>
						Atenção, a alteração não ocorrerá em nenhuma planilha, alterando apenas e diretamente o saldo.
						Feito isso, você poderá visualizar sempre o saldo total de suas finanças{' '}
						<strong>(pode ser negativo, positivo ou 0)</strong>.
					</p>
					<FormGroup
						id='amount'
						label='Novo saldo:'
						mask='R$ #.##0,00'
						placeholder='R$ XXX,XX'
						inputMode='decimal'
					/>
					<FormMessage
						message={message}
						type='error'
						className='mx-auto'
					/>
					<div className='flex justify-center items-center'>
						<Button
							size={'lg'}
							type='submit'
							className={cn('text-lg')}
							disabled={pending}
						>
							{pending ? (
								<>
									<VscLoading className='animate-spin mr-2' /> Alterando
								</>
							) : (
								<>Alterar</>
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
