'use client';

import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

export default function NotFound() {
	const isDark = useIsDarkTheme();

	return (
		<main
			className={cn(
				'min-h-screen w-full flex flex-col items-center justify-center px-4',
				isDark ? 'text-white' : 'text-black'
			)}
		>
			<h1 className='text-2xl text-center'>Oops... Parece que essa página não existe :(</h1>
			<div
				onClick={() => window.history.back()}
				className='underline cursor-pointer text-green-500'
			>
				Voltar
			</div>
		</main>
	);
}
