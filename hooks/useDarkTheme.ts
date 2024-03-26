import { create } from 'zustand';

type ThemeStore = {
	theme: 'dark' | 'light';
	toDark: () => void;
	toWhite: () => void;
};

export const useTheme = create<ThemeStore>((set) => ({
	theme:
		localStorage.getItem('finnancia-theme') === 'dark' || localStorage.getItem('finnancia-theme') === 'light'
			? (localStorage.getItem('finnancia-theme') as 'dark' | 'light')
			: 'light',
	toDark: () => {
		localStorage.setItem('finnancia-theme', 'dark');
		set({ theme: 'dark' });
	},
	toWhite: () => {
		localStorage.setItem('finnancia-theme', 'light');
		set({ theme: 'light' });
	},
}));

export function useIsDarkTheme() {
	const { theme } = useTheme();
	return theme === 'dark';
}
