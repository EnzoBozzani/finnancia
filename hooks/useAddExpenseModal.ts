import { create } from 'zustand';

type AddExpenseModalStore = {
	isOpen: boolean;
	onOpen: (sheetMonth: string) => void;
	onClose: () => void;
	sheetMonth: string | null;
};

export const useAddExpenseModal = create<AddExpenseModalStore>((set) => ({
	isOpen: false,
	onOpen: (sheetMonth: string) => set({ isOpen: true, sheetMonth }),
	onClose: () => set({ isOpen: false, sheetMonth: null }),
	sheetMonth: null,
}));
