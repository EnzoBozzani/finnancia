'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

import { Logo } from './Logo';

export const Loader: React.FC = () => {
	const isDark = useIsDarkTheme();

	return (
		<div
			className={cn(
				'rounded-full p-4 shadow-lg w-fit flex items-center justify-center',
				isDark ? 'bg-neutral-900' : 'bg-neutral-100'
			)}
		>
			<div className='w-16 h-16 border-4 border-dashed border-green-700 rounded-full animate-spin p-4 flex justify-center items-center'>
				<Logo
					hideFully
					className='w-fit'
					logoColor='text-green-700'
					isNotLink
				/>
			</div>
		</div>
	);
};
