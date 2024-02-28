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
			<header className='w-full p-4 flex items-center justify-between'>
				<Logo className='w-fit' />
				<Button
					size={'lg'}
					asChild
				>
					<Link href={'/auth'}>Sign in</Link>
				</Button>
			</header>
			<div className='w-full grid grid-cols-1 lg:grid-cols-2'>
				<div className='px-4 md:px-12 lg:px-0 lg:ps-24 py-12 flex items-center justify-center'>
					<div className='space-y-8 text-center sm:text-start'>
						<h1 className='text-3xl md:text-5xl font-semibold'>
							Manage your expenses with <span className='text-green-700'>Financia</span>
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
						{/* acertar o estilo aqui */}
						<div className='flex items-center justify-center sm:justify-between gap-6 flex-wrap'>
							<div className='flex items-center gap-x-2'>
								<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
									<MdOutlineManageSearch className='w-10 h-10 text-green-700' />
								</div>
								<p>Easy search and management</p>
							</div>
							<div className='flex items-center gap-x-2'>
								<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
									<CiCreditCard1 className='w-10 h-10 text-green-700' />
								</div>
								<p>Control your money</p>
							</div>
							<div className='flex items-center gap-x-2'>
								<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
									<MdCalendarMonth className='w-10 h-10 text-green-700' />
								</div>
								<p>Organize monthly expenses</p>
							</div>
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
			</div>
		</section>
	);
};
