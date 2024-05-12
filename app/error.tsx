'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const isDark = useIsDarkTheme();

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div
			className={cn(
				'w-full h-screen flex justify-center items-center flex-col gap-y-4 p-6',
				isDark ? 'text-white' : 'text-black'
			)}
		>
			<h2 className='font-bold text-3xl text-center'>Oops... Parece que algo não aconteceu como esperado!</h2>
			<div className='flex flex-col sm:flex-row items-center gap-2'>
				<button
					className='border-b pb-1 hover:opacity-70 border-b-transparent hover:border-b-green-500 transition-colors'
					onClick={() => reset()}
				>
					Tente novamente
				</button>
				<p>OU</p>
				<Link
					className='border-b pb-1 hover:opacity-70 border-b-transparent hover:border-b-green-500 transition-colors'
					href={'/dashboard'}
				>
					Ir para o Painel
				</Link>
			</div>
		</div>
	);
}
