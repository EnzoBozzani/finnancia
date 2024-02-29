'use client';

import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineManageSearch, MdCalendarMonth } from 'react-icons/md';
import { CiCreditCard1 } from 'react-icons/ci';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
	return (
		<section className='w-full bg-green-100'>
			<header className='w-full ps-0 pe-2 flex items-center justify-between'>
				<Logo className='w-fit' />
				<Button asChild>
					<Link href={'/auth'}>Sign in</Link>
				</Button>
			</header>
			<article className='w-full grid grid-cols-1 lg:grid-cols-2'>
				<div className='px-4 md:px-12 lg:px-0 lg:ps-24 py-12 flex items-center justify-center'>
					<div className='space-y-8 text-center sm:text-start'>
						<h1 className='text-3xl md:text-5xl font-semibold'>
							Manage your expenses with <span className='text-green-700'>Finnancia</span>
						</h1>
						<p className='text-sm md:text-base'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, deleniti eius nemo
							blanditiis ad incidunt quia distinctio earum, fugit unde in. Adipisci voluptatum voluptatem
							ab, quisquam libero corrupti ut quidem?
						</p>
						<Button
							size={'lg'}
							asChild
						>
							<Link
								href={'/auth'}
								className='flex items-center justify-center py-6'
							>
								Start using
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
			<article className='px-12 w-full flex items-start md:items-center justify-start md:justify-center gap-x-12 gap-y-6 mt-12 md:mt-24 mb-12 flex-col md:flex-row'>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<MdOutlineManageSearch className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Easy search and management</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<CiCreditCard1 className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Control your money</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<MdCalendarMonth className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Organize monthly expenses</p>
				</div>
			</article>
		</section>
	);
};
