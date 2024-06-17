'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { useTransition } from 'react';
import { IoSend } from 'react-icons/io5';
import { VscLoading } from 'react-icons/vsc';
import Link from 'next/link';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

export const SupportBox = () => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	const onSubmit = () => {
		startTransition(() => {});
	};

	return (
		<section className='w-full h-[calc(100vh-100px)] flex justify-center items-center flex-col gap-y-8'>
			<h1 className={cn('uppercase text-2xl md:text-5xl text-center font-black', isDark && 'text-white')}>
				Suporte
			</h1>
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
					id='text'
					name='text'
					placeholder='Após fazer sua pergunta, nosso contato será no seu e-mail da conta Google cadastrada no Finnancia!'
					className={cn(
						'w-full focus:outline-none resize-none text-sm md:text-base rounded-xl flex items-center p-4 pe-12 border border-transparent',
						isDark
							? 'bg-neutral-900 text-white focus:bg-neutral-800 focus:border-green-300'
							: 'bg-neutral-100 focus:bg-neutral-200 focus:border-green-500 text-black'
					)}
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
			<p className={cn('text-xs md:text-sm text-center', isDark ? 'text-neutral-600' : 'text-neutral-400')}>
				Você também pode consultar nossa{' '}
				<Link
					className={cn('underline', isDark ? 'text-neutral-100' : 'text-neutral-100')}
					href={'/'}
				>
					seção de perguntas frequentes
				</Link>
			</p>
		</section>
	);
};
