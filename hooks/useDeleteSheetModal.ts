import { Sheet } from '@prisma/client';
import { create } from 'zustand';

type DeleteSheetModalStore = {
	isOpen: boolean;
	onOpen: (Sheet: Sheet) => void;
	onClose: () => void;
	sheet: Sheet | null;
};

export const useDeleteSheetModal = create<DeleteSheetModalStore>((set) => ({
	isOpen: false,
	onOpen: (sheet) => set({ isOpen: true, sheet }),
	onClose: () => set({ isOpen: false, sheet: null }),
	sheet: null,
}));
