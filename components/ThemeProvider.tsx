'use client';

import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

export const ThemeProvider = ({ children, fontClassName }: { children: React.ReactNode; fontClassName: string }) => {
	const isDark = useIsDarkTheme();

	return (
		<body className={cn('flex flex-col', isDark ? 'dark-bg' : 'white-bg', fontClassName)}>
			<div>{children}</div>
		</body>
	);
};
