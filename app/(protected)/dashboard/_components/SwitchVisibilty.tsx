'use client';

import { FiEye, FiEyeOff } from 'react-icons/fi';

import { useAmountVisibility } from '@/hooks/useAmountVisibility';
import { cn } from '@/lib/utils';

export const SwitchVisibility = () => {
	const isVisible = useAmountVisibility((state) => state.isVisible);
	const onHide = useAmountVisibility((state) => state.onHide);
	const onShow = useAmountVisibility((state) => state.onShow);

	return (
		<button onClick={() => (isVisible ? onHide() : onShow())}>
			{isVisible ? (
				<FiEyeOff className={cn('w-6 h-6 md:w-8 md:h-8')} />
			) : (
				<FiEye className={cn('w-6 h-6 md:w-8 md:h-8')} />
			)}
		</button>
	);
};
