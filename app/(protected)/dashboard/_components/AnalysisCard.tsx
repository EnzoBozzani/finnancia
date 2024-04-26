'use client';

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';
import { useAmountVisibility } from '@/hooks/useAmountVisibility';

interface AnalysisCardProps {
	title: string;
	medium: number;
	textColor: 'green' | 'red' | 'sky' | 'neutral';
	currentMonthSheetValue: number;
	lastCard?: boolean;
	nSheets?: [number, number, number];
}

export const AnalysisCard = ({
	title,
	medium,
	textColor,
	currentMonthSheetValue,
	lastCard = false,
	nSheets,
}: AnalysisCardProps) => {
	const isDark = useIsDarkTheme();

	const isVisible = useAmountVisibility((state) => state.isVisible);

	if (lastCard && nSheets) {
		return (
			<div
				className={cn(
					'border rounded-xl p-4 space-y-4 md:space-y-8',
					isDark
						? `bg-neutral-900 border-neutral-700 text-white`
						: `bg-neutral-100 border-neutral-300 text-black`
				)}
			>
				<div className='flex items-center justify-center md:justify-start gap-x-2'>
					<h1 className={cn('font-black text-xl uppercase', isDark ? 'text-white' : 'text-black')}>
						{title}
					</h1>
					<span className='text-neutral-500 text-sm'>(total)</span>
				</div>
				<div className='text-4xl md:text-6xl text-center md:text-start font-bold overflow-scroll'>
					{currentMonthSheetValue} {currentMonthSheetValue === 1 ? 'planilha' : 'planilhas'}
				</div>
				<div className='flex items-center justify-center gap-x-2'>
					<div className='hidden text-sm text-neutral-500 md:flex flex-col items-center'>
						<p className={cn('text-center font-bold', isDark ? 'text-green-400' : 'text-green-700')}>
							{nSheets[0]}
						</p>
						<p className='text-center'>(saldo positivo)</p>
					</div>
					<div className='hidden text-sm text-neutral-500 md:flex flex-col items-center'>
						<p className={cn('text-center font-bold', isDark ? 'text-red-400' : 'text-red-700')}>
							{nSheets[1]}
						</p>
						<p className='text-center'>(saldo negativo)</p>
					</div>
					<div className='hidden text-sm text-neutral-500 md:flex flex-col items-center'>
						<p className={cn('text-center font-bold', isDark ? 'text-white' : 'text-black')}>
							{nSheets[2]}
						</p>
						<p className='text-center'>(saldo neutro)</p>
					</div>
				</div>
			</div>
		);
	}

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

	const porcentage = Math.abs((100 * diff) / (medium || 1));

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
			<div
				className={cn(
					'text-4xl md:text-6xl text-center md:text-start font-bold overflow-scroll',
					!isVisible && 'line-through text-transparent decoration-neutral-500'
				)}
			>
				{currencyFormat(currentMonthSheetValue)}
			</div>
			<div className='text-xs md:text-base flex items-center gap-x-4 justify-center md:justify-between'>
				<div className={cn('flex items-center', porcentageColor)}>
					{porcentageColor === 'text-green-500' ? (
						textColor === 'red' ? (
							<ArrowDownIcon className='w-8 h-8' />
						) : (
							<ArrowUpIcon className=' w-8 h-8' />
						)
					) : porcentageColor === 'text-red-500' ? (
						textColor === 'red' ? (
							<ArrowUpIcon className='w-8 h-8' />
						) : (
							<ArrowDownIcon className=' w-8 h-8' />
						)
					) : null}
					<p className='mr-2 overflow-scroll'>
						{porcentage.toLocaleString('pt-BR', {
							maximumFractionDigits: 2,
						})}
						%
					</p>
					<span className={cn(isDark ? 'text-white' : 'text-black')}>vs média mensal</span>
				</div>
				<div className='hidden text-sm text-neutral-500 lg:flex flex-col items-center'>
					<p
						className={cn(
							'text-center',
							isDark ? 'text-white' : 'text-black',
							!isVisible && 'line-through text-transparent decoration-neutral-500'
						)}
					>
						{currencyFormat(medium)}
					</p>
					<p className='text-center'>(média mensal)</p>
				</div>
			</div>
		</div>
	);
};
