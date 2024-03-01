'use client';

import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineManageSearch, MdCalendarMonth } from 'react-icons/md';
import { CiCreditCard1 } from 'react-icons/ci';

import { Button } from '@/components/ui/button';
import { IconsWithText } from './IconsWithText';

export const HeroSection = () => {
	return (
		<section className='w-full bg-green-100'>
			<div className='mx-auto max-w-screen-xl'>
				<article className='w-full grid grid-cols-1 lg:grid-cols-2'>
					<div className='px-4 md:px-12 py-12 flex items-center justify-center'>
						<div className='space-y-8 text-center sm:text-start'>
							<h1 className='text-3xl md:text-5xl font-semibold'>
								Controle seus gastos com <span className='text-green-700'>Finnancia</span>
							</h1>
							<p className='text-sm md:text-base'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, deleniti eius nemo
								blanditiis ad incidunt quia distinctio earum, fugit unde in. Adipisci voluptatum
								voluptatem ab, quisquam libero corrupti ut quidem?
							</p>
							<Button
								size={'lg'}
								asChild
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
