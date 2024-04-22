'use client';

import { IoSend } from 'react-icons/io5';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { AIService } from '@/services/AIService';

interface AIChatProps {
	user: {
		id: string;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
	};
}

export const AIChat = ({ user }: AIChatProps) => {
	const isDark = useIsDarkTheme();

	const [response, setResponse] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const promptRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit = async (formData: FormData) => {
		setIsLoading(true);
		const text = formData.get('text') as string;

		if (!text || text === '' || !promptRef.current) return;

		const res = await AIService.getResponseFromPrompt(text);

		setResponse(res.response);
		setIsLoading(false);

		promptRef.current.value = '';
	};

	return (
		<section className={cn('mx-auto w-[95%] rounded-xl p-6')}>
			<h1 className='bg-gradient-to-r from-green-700 via-green-500 to-green-400 inline-block text-transparent bg-clip-text font-bold text-4xl'>
				Bem vindo, {user.name?.split(' ')[0]}!
			</h1>
			<p className={cn('w-full sm:w-[70%] text-xl text-justify text-neutral-500 mb-12')}>
				Eu sou a FinnancIA, IA especializada em gerenciamento financeiro! Como posso te ajudar?
			</p>
			{isLoading ? (
				<Skeleton className='w-[90%] h-12 mx-auto mb-12' />
			) : (
				<div className={cn('w-[90%] mx-auto mb-12 prose lg:prose-xl', isDark && 'prose-invert')}>
					<Markdown>{response}</Markdown>
				</div>
			)}
			<form
				action={onSubmit}
				className='flex items-center mb-4 mx-auto'
			>
				<TextareaAutosize
					id='text'
					name='text'
					placeholder='Envie sua pergunta'
					className={cn(
						'w-full focus:outline-none resize-none text-lg rounded-xl flex items-center p-4 pe-12 border border-transparent',
						isDark
							? 'bg-neutral-900 text-white focus:bg-neutral-800 focus:border-green-300'
							: 'bg-neutral-100 focus:bg-neutral-200 focus:border-green-500 text-black'
					)}
					ref={promptRef}
				/>
				<button
					className='-ms-12 z-50'
					type='submit'
				>
					<IoSend className={cn('w-6 h-6', isDark ? 'text-neutral-500' : 'text-black')} />
				</button>
			</form>
			<p className={cn('text-sm text-center', isDark ? 'text-neutral-600' : 'text-neutral-400')}>
				A FinnancIA é construída sobre o Gemini, o qual pode apresentar informações imprecisas, inclusive sobre
				pessoas. Por isso, cheque as respostas.
			</p>
		</section>
	);
};
