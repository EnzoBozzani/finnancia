'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';

interface AnalysisCardProps {
	title: string;
	value: number;
	textColor: string;
}

export const AnalysisCard = ({ title, value, textColor }: AnalysisCardProps) => {
	const isDark = useIsDarkTheme();

	return (
		<div
			className={cn(
				'bg-transparent border rounded-xl',
				isDark ? 'border-neutral-700' : 'border-neutral-300',
				`text-${textColor}`
			)}
		>
			<p className={cn('font-black', isDark ? 'text-white' : 'text-black')}></p>
			<div className='text-3xl'>{currencyFormat(value)}</div>
		</div>
	);
};
