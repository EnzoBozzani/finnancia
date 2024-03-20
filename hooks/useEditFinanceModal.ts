import { Finance } from '@prisma/client';
import { create } from 'zustand';

type EditFinanceModalStore = {
	isOpen: boolean;
	onOpen: (finance: Finance) => void;
	onClose: () => void;
	finance: Finance | null;
};

export const useEditFinanceModal = create<EditFinanceModalStore>((set) => ({
	isOpen: false,
	onOpen: (finance) => set({ isOpen: true, finance }),
	onClose: () => set({ isOpen: false, finance: null }),
	finance: null,
}));
