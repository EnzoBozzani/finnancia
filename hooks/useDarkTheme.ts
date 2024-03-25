import { useTheme } from 'next-themes';

export function useIsDarkTheme() {
	const { systemTheme } = useTheme();
	return systemTheme === 'dark';
}
