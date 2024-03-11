import { BiSolidPyramid } from 'react-icons/bi';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
	className: string;
	hide?: boolean;
	hideFully?: boolean;
	isNotLink?: boolean;
	logoColor?: string;
}

export const Logo = ({ className, hide, hideFully, isNotLink, logoColor }: LogoProps) => {
	if (!isNotLink) {
		return (
			<Link
				href={'/'}
				className={cn('flex items-center justify-center gap-x-1', className)}
			>
				<BiSolidPyramid className={cn('w-12 h-12', logoColor || 'text-green-700')} />
				{hideFully || (
					<div className={hide ? 'hidden md:block' : ''}>
						<p className='text-lg sm:text-2xl font-semibold'>Finnancia</p>
						<p className='text-xs text-neutral-500'>Controle seu dinheiro</p>
					</div>
				)}
			</Link>
		);
	}

	return (
		<div className={cn('flex items-center justify-center gap-x-1', className)}>
			<BiSolidPyramid className={cn('w-12 h-12', logoColor || 'text-green-700')} />
			{hideFully || (
				<div className={hide ? 'hidden md:block' : ''}>
					<p className='text-lg sm:text-2xl font-semibold'>Finnancia</p>
					<p className='text-xs text-neutral-500'>Controle seu dinheiro</p>
				</div>
			)}
		</div>
	);
};
