'use client';

import { useEffect, useState } from 'react';

import { AddExpenseModal } from './AddExpenseModal';
import { AddSheetModal } from './AddSheetModal';
import { EditExpenseModal } from './EditExpenseModal';
import { DeleteExpenseModal } from './DeleteExpenseModal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<AddExpenseModal />
			<AddSheetModal />
			<EditExpenseModal />
			<DeleteExpenseModal />
		</>
	);
};