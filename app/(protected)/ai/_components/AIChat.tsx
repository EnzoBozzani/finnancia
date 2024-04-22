'use client';

import { IoSend } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { AIService } from '@/services/AIService';
import { Message } from '@prisma/client';

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

	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const promptRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit = async (formData: FormData) => {
		setIsLoading(true);
		const text = formData.get('text') as string;

		if (!text || text === '' || !promptRef.current) return;

		const res = await AIService.getChat(text);

		if (res.error) {
			//tratar erro com sonner
			return;
		}

		setMessages(res.messages);

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
			{isLoading || messages.length === 0 || !messages ? (
				<Skeleton className='w-[90%] h-[300px] mx-auto mb-12' />
			) : (
				<div
					className={cn(
						'h-[300px] ai-chat overflow-y-scroll w-[95%] pe-4 mx-auto mb-12 prose lg:prose-xl',
						isDark && 'prose-invert'
					)}
				>
					{messages.map((message) => (
						<>
							<Markdown key={message.id}>
								{(message.role === 'MODEL' ? '**FinnancIA:** ' : `**${user.name?.split(' ')[0]}:** `) +
									message.body}
							</Markdown>
						</>
					))}
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
						'w-full focus:outline-none resize-none text-base md:text-lg rounded-xl flex items-center p-4 pe-12 border border-transparent',
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
					<IoSend
						className={cn('w-6 h-6 hover:text-green-600', isDark ? 'text-neutral-100' : 'text-black')}
					/>
				</button>
			</form>
			<p className={cn('text-xs md:text-sm text-center', isDark ? 'text-neutral-600' : 'text-neutral-400')}>
				A FinnancIA é construída sobre o Gemini, o qual pode apresentar informações imprecisas, inclusive sobre
				pessoas. Por isso, cheque as respostas.
			</p>
		</section>
	);
};
