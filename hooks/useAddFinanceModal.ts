import { create } from 'zustand';

type AddFinanceModalStore = {
	isOpen: boolean;
	onOpen: (sheetMonth: string) => void;
	onClose: () => void;
	sheetMonth: string | null;
};

export const useAddFinanceModal = create<AddFinanceModalStore>((set) => ({
	isOpen: false,
	onOpen: (sheetMonth: string) => set({ isOpen: true, sheetMonth }),
	onClose: () => set({ isOpen: false, sheetMonth: null }),
	sheetMonth: null,
}));
