'use client';

import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '@radix-ui/react-icons';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';

interface AnalysisCardProps {
	title?: string;
	medium: number;
	textColor?: 'green' | 'red';
	currentMonthSheetValue: number;
	isAmountCard?: boolean;
}

export const AnalysisCard = ({
	title,
	medium,
	textColor,
	currentMonthSheetValue,
	isAmountCard = false,
}: AnalysisCardProps) => {
	const isDark = useIsDarkTheme();

	const diff = medium - currentMonthSheetValue;
	const increasedOrDecreased = diff > 0 ? 'decreased' : diff === 0 ? 'equal' : 'increased';

	const porcentageColor =
		increasedOrDecreased === 'equal'
			? 'text-neutral-500'
			: increasedOrDecreased === 'decreased'
			? textColor === 'red'
				? 'text-green-500'
				: 'text-red-500'
			: textColor === 'red'
			? 'text-red-500'
			: 'text-green-500';

	const porcentage = (100 * diff) / (medium || 1);

	if (isAmountCard) {
		return (
			<div
				className={cn(
					'border rounded-xl p-4 space-y-4 md:space-y-8',
					isDark
						? `bg-neutral-900 border-neutral-700 text-${textColor}-400`
						: `bg-neutral-100 border-neutral-300 text-${textColor}-700`
				)}
			>
				<div className='flex items-center justify-center md:justify-start gap-x-2'>
					<h1 className={cn('font-black text-xl uppercase', isDark ? 'text-white' : 'text-black')}>Saldo</h1>
					<span className='text-neutral-500 text-sm'>(esse mês)</span>
				</div>
				<div className='text-4xl md:text-6xl text-center md:text-start font-bold'>
					{currencyFormat(currentMonthSheetValue)}
				</div>
				<div className='text-xs md:text-base flex items-center gap-x-4 justify-center md:justify-between'>
					<div className={cn('flex items-center', porcentageColor)}>
						{porcentageColor === 'text-green-500' ? (
							<ArrowUpIcon className=' w-8 h-8' />
						) : porcentageColor === 'text-red-500' ? (
							<ArrowDownIcon className=' w-8 h-8' />
						) : null}
						<p className='mr-2'>
							{porcentage.toLocaleString('pt-BR', {
								maximumFractionDigits: 2,
							})}
							%
						</p>
						<span className={cn(isDark ? 'text-white' : 'text-black')}>vs média mensal</span>
					</div>
					<div className='hidden text-sm text-neutral-500 lg:flex flex-col items-center'>
						<p className={cn(isDark ? 'text-white' : 'text-black')}>{currencyFormat(medium)}</p>
						<p>(média mensal)</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'border rounded-xl p-4 space-y-4 md:space-y-8',
				isDark
					? `bg-neutral-900 border-neutral-700 text-${textColor}-400`
					: `bg-neutral-100 border-neutral-300 text-${textColor}-700`
			)}
		>
			<div className='flex items-center justify-center md:justify-start gap-x-2'>
				<h1 className={cn('font-black text-xl uppercase', isDark ? 'text-white' : 'text-black')}>{title}</h1>
				<span className='text-neutral-500 text-sm'>(esse mês)</span>
			</div>
			<div className='text-4xl md:text-6xl text-center md:text-start font-bold'>
				{currencyFormat(currentMonthSheetValue)}
			</div>
			<div className='text-xs md:text-base flex items-center gap-x-4 justify-center md:justify-between'>
				<div className={cn('flex items-center', porcentageColor)}>
					{porcentageColor === 'text-green-500' ? (
						<ArrowUpIcon className=' w-8 h-8' />
					) : porcentageColor === 'text-red-500' ? (
						<ArrowDownIcon className=' w-8 h-8' />
					) : null}
					<p className='mr-2'>
						{porcentage.toLocaleString('pt-BR', {
							maximumFractionDigits: 2,
						})}
						%
					</p>
					<span className={cn(isDark ? 'text-white' : 'text-black')}>vs média mensal</span>
				</div>
				<div className='hidden text-sm text-neutral-500 lg:flex flex-col items-center'>
					<p className={cn(isDark ? 'text-white' : 'text-black')}>{currencyFormat(medium)}</p>
					<p>(média mensal)</p>
				</div>
			</div>
		</div>
	);
};
