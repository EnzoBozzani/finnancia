import { create } from 'zustand';

type ThemeStore = {
	theme: 'dark' | 'light';
	toDark: () => void;
	toWhite: () => void;
};

export const useTheme = create<ThemeStore>((set) => ({
	theme: 'light',
	toDark: () => set({ theme: 'dark' }),
	toWhite: () => set({ theme: 'light' }),
}));

export function useIsDarkTheme() {
	const { theme } = useTheme();
	return theme === 'dark';
}
