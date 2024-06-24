'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
			<div
				className={cn(
					'flex flex-col gap-y-8 w-[95%] lg:w-[70%] border rounded-xl p-4 text-black bg-neutral-100',
					isDark && 'text-white border-neutral-700 bg-neutral-900'
				)}
			>
				<h2 className='font-bold text-xl uppercase text-center'>
					Oops... Parece que algo não aconteceu como esperado :(
				</h2>
				<p className='text-center text-neutral-500'>
					<strong className='font-black uppercase'>Mensagem do erro:</strong>{' '}
					{error.message || 'Algo deu errado'}
				</p>
				<div className='flex flex-col md:flex-row w-full items-center justify-center gap-4'>
					<Button onClick={reset}>Tentar novamente</Button>
					<Link href={'/dashboard'}>
						<Button>Ir para o Painel</Button>
					</Link>
				</div>
				<p className='text-center text-neutral-500'>
					Se possível, pedimos que informe como ocorreu o erro por meio de nosso{' '}
					<Link
						className='underline hover:opacity-50 font-black'
						href={'/help'}
					>
						Suporte
					</Link>
					. Sua ajuda é muito importante para nós tornarmos o Finnancia um lugar melhor para você!
				</p>
			</div>
		</div>
	);
}
