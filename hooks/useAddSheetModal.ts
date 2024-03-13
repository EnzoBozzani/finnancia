import { create } from 'zustand';

type AddSheetModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useAddSheetModal = create<AddSheetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
