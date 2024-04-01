'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { Toaster } from './ui/sonner';

export const ToasterProvider = () => {
	const isDark = useIsDarkTheme();

	return (
		<Toaster
			duration={2000}
			toastOptions={{
				style: {
					backgroundColor: isDark ? '#000' : '#fff',
					color: isDark ? '#fff' : '#000',
					border: 'none',
				},
			}}
		/>
	);
};
