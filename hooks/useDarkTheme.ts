import { create } from 'zustand';

type ThemeStore = {
	theme: 'dark' | 'light';
	toDark: () => void;
	toWhite: () => void;
};

export const useTheme = create<ThemeStore>((set) => ({
	theme: 'light',
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
