'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

export const SupportBox = () => {
	const isDark = useIsDarkTheme();

	return (
		<>
			<h1 className={cn('uppercase text-5xl text-center font-black', isDark && 'text-white')}>Suporte</h1>
			<div>COLOCAR Resizable text area</div>
		</>
	);
};
