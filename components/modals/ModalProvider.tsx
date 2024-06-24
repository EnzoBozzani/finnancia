'use client';

import { useEffect, useState } from 'react';

import { AddFinanceModal } from './AddFinanceModal';
import { AddSheetModal } from './AddSheetModal';
import { EditFinanceModal } from './EditFinanceModal';
import { DeleteFinanceModal } from './DeleteFinanceModal';
import { DeleteSheetModal } from './DeleteSheetModal';
import { SetInitialAmountModal } from './SetInitialAmountModal';
import { ProModal } from './ProModal';
import { ChangeAmountModal } from './ChangeAmountModal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<AddFinanceModal />
			<AddSheetModal />
			<EditFinanceModal />
			<DeleteFinanceModal />
			<DeleteSheetModal />
			<SetInitialAmountModal />
			<ProModal />
			<ChangeAmountModal />
		</>
	);
};
