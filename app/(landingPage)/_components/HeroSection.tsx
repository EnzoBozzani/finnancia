'use client';

import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

import { IconsWithText } from './IconsWithText';

export const HeroSection = () => {
	return (
		<section className='w-full bg-green-100 h-auto lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:items-center'>
			<header className='bg-green-100 w-full'>
				<div className='mx-auto max-w-screen-xl px-4 md:px-12 py-4 flex items-center justify-between'>
					<Logo
						hide
						className='w-fit'
					/>
					<Button asChild>
						<Link href={'/auth'}>Entrar</Link>
					</Button>
				</div>
			</header>
			<div className='mx-auto max-w-screen-xl'>
				<article className='w-full grid grid-cols-1 lg:grid-cols-2'>
					<div className='px-4 md:px-12 py-12 flex items-center justify-center'>
						<div className='space-y-8'>
							<h1 className='text-3xl md:text-5xl font-semibold text-center lg:text-start'>
								Controle suas finanças com <span className='text-green-700'>Finnancia</span>
							</h1>
							<p className='text-sm md:text-base text-center lg:text-justify'>
								Centralize finanças, registre gastos detalhados e navegue intuitivamente entre
								planilhas. Financia simplifica o controle financeiro, tornando a gestão mensal fácil e
								eficiente. Experimente agora!
							</p>
							<div className='flex items-center justify-center lg:block'>
								<Button
									size={'lg'}
									asChild
									className=''
								>
									<Link
										href={'/auth'}
										className='flex items-center justify-center py-6'
									>
										Comece a usar
										<ArrowRightIcon className='ms-2 bg-green-700 p-1 rounded w-8 h-8' />
									</Link>
								</Button>
							</div>
						</div>
					</div>
					<div className='flex items-center justify-center'>
						<Image
							width={300}
							height={500}
							src={'/hero-section-draw.svg'}
							alt='draw'
							className='w-[80%] md:w-[500px] h-auto'
						/>
					</div>
				</article>
				<IconsWithText />
			</div>
		</section>
	);
};
