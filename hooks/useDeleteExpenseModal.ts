import { Expense } from '@prisma/client';
import { create } from 'zustand';

type DeleteExpenseModalStore = {
	isOpen: boolean;
	onOpen: (expense: Expense) => void;
	onClose: () => void;
	expense: Expense | null;
};

export const useDeleteExpenseModal = create<DeleteExpenseModalStore>((set) => ({
	isOpen: false,
	onOpen: (expense) => set({ isOpen: true, expense }),
	onClose: () => set({ isOpen: false, expense: null }),
	expense: null,
}));
