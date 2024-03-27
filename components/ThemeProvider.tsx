'use client';

import { cn } from '@/lib/utils';
import { useIsDarkTheme, useTheme } from '@/hooks/useDarkTheme';
import { useEffect } from 'react';

export const ThemeProvider = ({ children, fontClassName }: { children: React.ReactNode; fontClassName: string }) => {
	const isDark = useIsDarkTheme();

	const toDark = useTheme((state) => state.toDark);
	const toWhite = useTheme((state) => state.toWhite);

	useEffect(() => {
		const theme = localStorage.getItem('finnancia-theme');
		if (!theme) return;
		theme === 'dark' ? toDark() : toWhite();
	}, []);

	return (
		<body className={cn('flex flex-col', isDark ? 'bg-neutral-950' : 'bg-white', fontClassName)}>
			<div>{children}</div>
		</body>
	);
};
