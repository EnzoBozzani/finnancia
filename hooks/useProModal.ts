import { create } from 'zustand';

type ProModalStore = {
	isOpen: boolean;
	onOpen: (text: string) => void;
	onClose: () => void;
	text: string | null;
};

export const useProModal = create<ProModalStore>((set) => ({
	isOpen: false,
	onOpen: (text) => set({ isOpen: true, text }),
	onClose: () => set({ isOpen: false, text: null }),
	text: null,
}));
