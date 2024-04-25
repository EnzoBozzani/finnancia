import { create } from 'zustand';

type AmountVisibilityStore = {
	isVisible: boolean;
	onShow: () => void;
	onHide: () => void;
};

export const useAmountVisibility = create<AmountVisibilityStore>((set) => ({
	isVisible: false,
	onShow: () => set({ isVisible: true }),
	onHide: () => set({ isVisible: false }),
}));
