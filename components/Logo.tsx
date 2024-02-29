import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
	className: string;
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<Link
			href={'/'}
			className={cn('flex items-center justify-center', className)}
		>
			<Image
				width={70}
				height={70}
				src={'/logo.png'}
				alt='Logo'
				className='w-[70px] sm:w-[90px] h-auto'
			/>
			<div className='-ms-2 '>
				<p className='text-lg sm:text-2xl font-semibold'>Finnancia</p>
				<p className='text-xs text-neutral-500'>Manage your Money</p>
			</div>
		</Link>
	);
};
