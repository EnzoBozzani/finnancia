'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

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

	const onSubmit = () => {};

	return (
		<section className={cn('mx-auto w-[95%] rounded-xl p-6', isDark ? 'bg-neutral-800' : 'bg-neutral-100')}>
			<h1 className='bg-gradient-to-r from-green-700 via-green-500 to-green-400 inline-block text-transparent bg-clip-text font-bold text-4xl'>
				Bem vindo, {user.name?.split(' ')[0]}!
			</h1>
			<p className={cn('text-xl text-justify text-neutral-500 mb-24')}>
				Eu sou a FinnancIA, IA especializada em gerenciamento financeiro! Como posso te ajudar?
			</p>
			<form action={onSubmit}></form>
		</section>
	);
};
