'use client';

import { IoSend } from 'react-icons/io5';
import { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { generateResponseFromPrompt } from '@/lib/ai';
import { Skeleton } from '@/components/ui/skeleton';

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

	const onSubmit = async (formData: FormData) => {
		setIsLoading(true);
		const text = formData.get('text') as string;

		if (!text || text === '') return;

		const response = await generateResponseFromPrompt(text);

		setResponse(response);
		setIsLoading(false);
	};

	return (
		<section className={cn('mx-auto w-[95%] rounded-xl p-6', isDark ? 'bg-neutral-800' : 'bg-neutral-200')}>
			<h1 className='bg-gradient-to-r from-green-700 via-green-500 to-green-400 inline-block text-transparent bg-clip-text font-bold text-4xl'>
				Bem vindo, {user.name?.split(' ')[0]}!
			</h1>
			<p className={cn('w-full sm:w-[70%] text-xl text-justify text-neutral-500 mb-12')}>
				Eu sou a FinnancIA, IA especializada em gerenciamento financeiro! Como posso te ajudar?
			</p>
			{isLoading ? (
				<Skeleton className='w-[95%] h-12' />
			) : (
				<p className={cn('w-[80%] mx-auto mb-12', isDark ? 'text-white' : 'text-black')}>{response}</p>
			)}
			<form
				action={onSubmit}
				className='flex items-center mb-4 mx-auto'
			>
				<Textarea
					id='text'
					name='text'
					placeholder='Envie sua pergunta'
					className={cn(
						'text-lg rounded-full p-4 border border-transparent',
						isDark
							? 'bg-neutral-950 text-white focus:bg-neutral-900 focus:border-green-300'
							: 'bg-white focus:bg-neutral-100 focus:border-green-500 text-black'
					)}
					style={{
						resize: 'none',
					}}
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
