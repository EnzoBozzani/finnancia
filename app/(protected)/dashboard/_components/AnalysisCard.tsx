'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';

interface AnalysisCardProps {
	title: string;
	value: number;
	textColor: 'green' | 'red' | 'sky';
	currentMonthSheetValue: number;
}

export const AnalysisCard = ({ title, value, textColor, currentMonthSheetValue }: AnalysisCardProps) => {
	const isDark = useIsDarkTheme();

	const diff = value - currentMonthSheetValue;
	const increasedOrDecreased = diff > 0 ? 'increased' : diff === 0 ? 'equal' : 'decreased';

	return (
		<div
			className={cn(
				'bg-transparent border rounded-xl p-4 space-y-8',
				isDark ? `border-neutral-700 text-${textColor}-400` : `border-neutral-300 text-${textColor}-700`
			)}
		>
			<div className='flex items-center gap-x-2'>
				<h1 className={cn('font-black text-xl uppercase', isDark ? 'text-white' : 'text-black')}>{title}</h1>
				<span className='text-neutral-500 text-sm'>(esse mês)</span>
			</div>
			<div className='text-6xl font-bold'>{currencyFormat(currentMonthSheetValue)}</div>
			<div>
				<p>{value}</p>
			</div>
		</div>
	);
};
