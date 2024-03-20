import { Finance } from '@prisma/client';
import { create } from 'zustand';

type DeleteFinanceModalStore = {
	isOpen: boolean;
	onOpen: (finance: Finance) => void;
	onClose: () => void;
	finance: Finance | null;
};

export const useDeleteFinanceModal = create<DeleteFinanceModalStore>((set) => ({
	isOpen: false,
	onOpen: (finance) => set({ isOpen: true, finance }),
	onClose: () => set({ isOpen: false, finance: null }),
	finance: null,
}));
