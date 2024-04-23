'use client';

import Markdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { IoSend } from 'react-icons/io5';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Message } from '@prisma/client';

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
	oldMessages: Message[];
}

export const AIChat = ({ user, oldMessages }: AIChatProps) => {
	const isDark = useIsDarkTheme();

	const [messages, setMessages] = useState<Message[]>(oldMessages);
	const [isLoading, setIsLoading] = useState(false);
	const promptRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit = async (formData: FormData) => {
		setIsLoading(true);

		const text = formData.get('text') as string;

		if (!text || text === '' || !promptRef.current) return;

		const res = await AIService.getChat(text);

		if (res.error) {
			toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
			return;
		}

		setMessages((current) => [...current, res.userMessage, res.modelMessage]);

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
			{messages.length === 0 || !messages ? (
				<div
					className={cn(
						'h-[390px] ai-chat overflow-y-scroll w-[95%] mx-auto mb-12 flex items-center justify-center flex-wrap gap-4 italic',
						isDark ? 'text-neutral-200' : 'text-neutral-700'
					)}
				>
					{['Como economizar mais?', 'Como me manter saudável financeiramente?'].map((text) => (
						<div
							key={text}
							className={cn(
								'cursor-pointer hover:border-green-600 w-[200px] h-[200px] border-2 rounded-xl flex justify-center items-center text-center',
								isDark ? 'bg-neutral-800/50 border-neutral-700' : 'bg-neutral-200/50 border-neutral-200'
							)}
							onClick={() => {
								if (!promptRef.current) return;
								promptRef.current.value = text;
								promptRef.current.focus();
							}}
						>
							{text}
						</div>
					))}
				</div>
			) : (
				<div
					className={cn(
						'h-[390px] ai-chat overflow-y-scroll w-[95%] pe-4 mx-auto mb-12 prose lg:prose-xl',
						isDark && 'prose-invert'
					)}
				>
					{messages.map((message) => (
						<Markdown key={message.id}>
							{(message.role === 'MODEL' ? '**FinnancIA:** ' : `**${user.name?.split(' ')[0]}:** `) +
								message.body}
						</Markdown>
					))}
					{isLoading && (
						<>
							<Skeleton className='w-[95%] h-6 mb-4' />
							<Skeleton className='w-[95%] h-6 mb-4' />
							<Skeleton className='w-[95%] h-6' />
						</>
					)}
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
