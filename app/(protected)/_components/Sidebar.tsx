'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSidebar } from '@/hooks/useSidebar';
import { sheetsService } from '@/services/sheetsService';
import { useAddSheetModal } from '@/hooks/useAddSheetModal';
import { orderYearsForSelectSheet } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useSetInitialAmountModal } from '@/hooks/useSetInitialAmountModal';

import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

type SheetMonth = {
	name: string;
	id: string;
	order: number;
};

export type Year = {
	order: number;
	sheets: SheetMonth[];
};

export const Sidebar = () => {
	const currentUser = useCurrentUser();

	const isOpen = useSidebar((state) => state.isOpen);
	const onOpen = useSidebar((state) => state.onOpen);
	const onClose = useSidebar((state) => state.onClose);

	const onOpenSheetModal = useAddSheetModal((state) => state.onOpen);

	const onOpenSetAmountModal = useSetInitialAmountModal((state) => state.onOpen);

	const isDark = useIsDarkTheme();

	const [sheets, setSheets] = useState<Year[]>([]);
	const [isInitialAmountSet, setIsInitialAmountSet] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	useEffect(() => {
		const fetchSheets = async () => {
			const res = await sheetsService.getUserSheetsAndIsInitialAmountSet();

			if (res.error) {
				toast.error('Algo deu errado!');
				return;
			}

			const orderedYears = orderYearsForSelectSheet(res.sheets);

			setIsInitialAmountSet(res.isInitialAmountSet);
			setSheets(orderedYears);

			setIsLoading(false);
		};
		fetchSheets();
	}, []);

	useEffect(() => {
		const fetchSheets = async () => {
			const res = await sheetsService.getUserSheetsAndIsInitialAmountSet();

			if (res.error) {
				toast.error('Algo deu errado!');
				return;
			}

			const orderedYears = orderYearsForSelectSheet(res.sheets);

			setIsInitialAmountSet(res.isInitialAmountSet);
			setSheets(orderedYears);

			setIsLoading(false);
		};
		fetchSheets();
	}, [isOpen]);

	return (
		<>
			<DesktopSidebar
				currentUser={currentUser}
				isDark={isDark}
				isInitialAmountSet={isInitialAmountSet}
				isLoading={isLoading}
				isSelectOpen={isSelectOpen}
				onOpenSetAmountModal={onOpenSetAmountModal}
				sheets={sheets}
				onOpenSheetModal={onOpenSheetModal}
				setIsSelectOpen={setIsSelectOpen}
			/>
			<MobileSidebar
				currentUser={currentUser}
				isDark={isDark}
				isInitialAmountSet={isInitialAmountSet}
				isLoading={isLoading}
				isSelectOpen={isSelectOpen}
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				onOpenSetAmountModal={onOpenSetAmountModal}
				sheets={sheets}
				onOpenSheetModal={onOpenSheetModal}
				setIsSelectOpen={setIsSelectOpen}
			/>
		</>
	);
};
