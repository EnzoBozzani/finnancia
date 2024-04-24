import { create } from 'zustand';

type SetInitialAmountModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useSetInitialAmountModal = create<SetInitialAmountModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
