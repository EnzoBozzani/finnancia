import { create } from 'zustand';

type AddExpenseModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useAddExpenseModal = create<AddExpenseModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
