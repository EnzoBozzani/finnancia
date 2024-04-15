'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const isDark = useIsDarkTheme();

	return (
		<div
			className={cn('animate-pulse rounded-md', className, isDark ? 'bg-neutral-400/10' : 'bg-neutral-700/10')}
			{...props}
		/>
	);
}

export { Skeleton };
