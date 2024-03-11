import { Expense } from '@prisma/client';
import { create } from 'zustand';

type EditExpenseModalStore = {
	isOpen: boolean;
	onOpen: (expense: Expense) => void;
	onClose: () => void;
	expense: Expense | null;
};

export const useEditExpenseModal = create<EditExpenseModalStore>((set) => ({
	isOpen: false,
	onOpen: (expense) => set({ isOpen: true, expense }),
	onClose: () => set({ isOpen: false, expense: null }),
	expense: null,
}));
