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
				width={90}
				height={90}
				src={'/logo.png'}
				alt='Logo'
			/>
			<div className='-ms-2 '>
				<p className='text-2xl font-semibold'>Financia</p>
				<p className='text-xs text-neutral-500'>Manage your Money</p>
			</div>
		</Link>
	);
};
