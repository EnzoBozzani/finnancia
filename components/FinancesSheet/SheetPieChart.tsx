'use client';

import { Chart as ChartJS, ChartData, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Finance, Category } from '@prisma/client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, getCategoriesDataFromFinances } from '@/lib/utils';
import { Color, colorMap } from '@/constants/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SheetPieChartProps {
	finances: (Finance & { category?: Category })[];
}

export const SheetPieChart = ({ finances }: SheetPieChartProps) => {
	const isDark = useIsDarkTheme();

	const { amountsExpense, amountsProfit, colorsExpense, colorsProfit, namesExpense, namesProfit } =
		getCategoriesDataFromFinances(finances);

	const dataExpense: ChartData<'pie'> = {
		labels: namesExpense,
		datasets: [
			{
				label: 'Valor',
				data: amountsExpense,
				backgroundColor: isDark
					? colorsExpense.map((color) => colorMap[color as Color].dark)
					: colorsExpense.map((color) => colorMap[color as Color].light),
				hoverOffset: 4,
				borderColor: isDark ? 'rgb(64 64 64)' : 'rgb(212 212 212)',
				borderWidth: 1,
			},
		],
	};

	const dataProfit: ChartData<'pie'> = {
		labels: namesProfit,
		datasets: [
			{
				label: 'Valor',
				data: amountsProfit,
				backgroundColor: isDark
					? colorsProfit.map((color) => colorMap[color as Color].dark)
					: colorsProfit.map((color) => colorMap[color as Color].light),
				hoverOffset: 4,
				borderColor: isDark ? 'rgb(64 64 64)' : 'rgb(212 212 212)',
				borderWidth: 1,
			},
		],
	};

	if (finances.length === 0) {
		return (
			<div
				className={cn(
					'flex flex-col justify-center items-center w-full rounded-xl border p-4',
					isDark ? 'border-neutral-700' : 'border-neutral-300'
				)}
			>
				<h1
					className={cn(
						'pb-4 text-lg font-bold text-center',
						isDark ? 'text-neutral-300' : 'text-neutral-700'
					)}
				>
					GANHO, GASTO E SALDO MENSAL
				</h1>
				<div
					className={cn(
						'w-full bg-transparent border-t p-4 pt-8 space-y-2 flex justify-center items-center',
						isDark ? 'text-neutral-300 border-neutral-700' : 'border-neutral-300 text-neutral-700'
					)}
				>
					Oops... Parece que você ainda não tem nenhuma planilha!
				</div>
			</div>
		);
	}

	return (
		<div className='flex items-center justify-evenly gap-x-2 mb-12'>
			<div
				className={cn(
					'flex flex-col justify-center items-center w-[45%] rounded-xl border p-4',
					isDark ? 'border-neutral-700' : 'border-neutral-300'
				)}
			>
				<h1 className={cn('text-lg font-bold text-center', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
					Gastos por Categoria
				</h1>
				<Pie data={dataExpense} />
			</div>
			<div
				className={cn(
					'flex flex-col justify-center items-center w-[45%] rounded-xl border p-4',
					isDark ? 'border-neutral-700' : 'border-neutral-300'
				)}
			>
				<h1 className={cn('text-lg font-bold text-center', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
					Ganhos por Categoria
				</h1>
				<Pie data={dataProfit} />
			</div>
		</div>
	);
};
