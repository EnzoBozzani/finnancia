import { create } from 'zustand';

type ChangeAmountModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useChangeAmountModal = create<ChangeAmountModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
