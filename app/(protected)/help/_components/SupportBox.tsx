'use client';

import { toast } from 'sonner';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef, useTransition } from 'react';
import { IoSend } from 'react-icons/io5';
import { VscLoading } from 'react-icons/vsc';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { usersService } from '@/services/usersService';

export const SupportBox = () => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	const promptRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit = (formData: FormData) => {
		startTransition(async () => {
			const message = formData.get('message') as string;

			if (!message || message === '') {
				toast.error('A mensagem é obrigatória!');
				return;
			}

			if (message.length > 500) {
				toast.error('A mensagem deve ter no máximo 500 caracteres!');
				return;
			}

			const res = await usersService.sendMessage(message);

			if (res.error) {
				toast.error(res.error);
				return;
			}

			if (res.timeLimit) {
				toast.error(res.message);
				return;
			}

			toast.success('Mensagem enviada com sucesso!');
		});
		if (promptRef.current) {
			promptRef.current.value = '';
		}
	};

	return (
		<section className='w-full flex justify-center items-center flex-col gap-y-8'>
			<h1 className={cn('uppercase text-2xl md:text-5xl text-center font-black', isDark && 'text-white')}>
				Suporte
			</h1>
			<p
				className={cn(
					'text-justify text-sm text-neutral-300 w-[90%] lg:w-[75%] mx-auto',
					isDark && 'text-neutral-700'
				)}
			>
				Se você tiver alguma dúvida, sugestão ou problema, fique à vontade para nos enviar uma mensagem! A
				partir do momento que recerbermos seu feedback, nosso contato será pelo e-mail da conta Google usada
				para cadastrar-se no Finnancia. Desde já, agradecemos por nos ajudar a melhorar!
			</p>
			<form
				action={onSubmit}
				className='flex items-center mx-auto w-[90%] lg:w-[75%]'
				onKeyDown={(ev) => {
					if (ev.key === 'Enter' && !ev.shiftKey) {
						ev.currentTarget.requestSubmit();
					}
				}}
			>
				<TextareaAutosize
					id='message'
					name='message'
					placeholder='Envie seu feedback'
					className={cn(
						'w-full focus:outline-none resize-none text-sm md:text-base rounded-xl flex items-center p-4 pe-12 border border-transparent',
						isDark
							? 'bg-neutral-900 text-white focus:bg-neutral-800 focus:border-green-300'
							: 'bg-neutral-100 focus:bg-neutral-200 focus:border-green-500 text-black'
					)}
					ref={promptRef}
					disabled={pending}
				/>
				<button
					className={cn('-ms-12 z-50', isDark ? 'text-neutral-100' : 'text-black')}
					type='submit'
					disabled={pending}
				>
					{!pending ? (
						<IoSend className='w-6 h-6 hover:text-green-600' />
					) : (
						<VscLoading className='w-8 h-8 animate-spin mr-2' />
					)}
				</button>
			</form>
		</section>
	);
};
