'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useEffect } from 'react';

import { useAmountVisibility } from '@/hooks/useAmountVisibility';
import { cn } from '@/lib/utils';

export const SwitchVisibility = () => {
	const isVisible = useAmountVisibility((state) => state.isVisible);
	const onHide = useAmountVisibility((state) => state.onHide);
	const onShow = useAmountVisibility((state) => state.onShow);

	useEffect(() => {
		const isAmountVisible = localStorage.getItem('amount-visible') === 'true';

		isAmountVisible ? onShow() : onHide();
	}, []);

	return (
		<button
			onClick={() => {
				if (isVisible) {
					onHide();
					localStorage.setItem('amount-visible', 'false');
				} else {
					onShow();
					localStorage.setItem('amount-visible', 'true');
				}
			}}
		>
			{isVisible ? (
				<FiEyeOff className={cn('w-6 h-6 md:w-8 md:h-8')} />
			) : (
				<FiEye className={cn('w-6 h-6 md:w-8 md:h-8')} />
			)}
		</button>
	);
};
