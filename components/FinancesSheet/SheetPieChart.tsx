'use client';

import { Chart as ChartJS, ChartData, ChartOptions, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Finance } from '@prisma/client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';
import { useScreenWidth } from '@/hooks/useScreenWidth';

ChartJS.register(ArcElement);

interface SheetPieChartProps {
	finances: Finance[];
}

export const SheetPieChart = ({ finances }: SheetPieChartProps) => {
	const isDark = useIsDarkTheme();

	const width = useScreenWidth();

	// const options: ChartOptions<'pie'> = {
	// 	responsive: true,
	// 	color: isDark ? '#d4d4d4' : '#404040',
	// 	plugins: {
	// 		legend: {
	// 			position: 'bottom' as const,
	// 		},
	// 	},
	// 	scales: {
	// 		x: {
	// 			grid: {
	// 				color: !isDark ? '#d4d4d4' : '#404040',
	// 				drawTicks: false,
	// 			},
	// 			ticks: {
	// 				padding: 10,
	// 			},
	// 		},
	// 		y: {
	// 			grid: {
	// 				color: !isDark ? '#d4d4d4' : '#404040',
	// 				drawTicks: false,
	// 			},
	// 			ticks: {
	// 				callback(tickValue, index, ticks) {
	// 					return currencyFormat(Number(tickValue));
	// 				},
	// 				padding: 10,
	// 			},
	// 		},
	// 	},
	// };

	const data: ChartData<'pie'> = {
		labels: ['Red', 'Blue', 'Yellow'],
		datasets: [
			{
				label: 'Categorias',
				data: [300, 50, 100],
				backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
				hoverOffset: 4,
			},
		],
	};

	if (finances.length !== 0) {
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
		<div
			className={cn(
				'flex flex-col justify-center items-center w-[95%] mx-auto rounded-xl border p-4',
				isDark ? 'border-neutral-700' : 'border-neutral-300'
			)}
		>
			<h1 className={cn('text-lg font-bold text-center', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
				Categorias
			</h1>
			{width >= 640 ? (
				<Pie
					data={data}
					options={{}}
				/>
			) : (
				<div className='w-full'>{/* sm devices */}</div>
			)}
		</div>
	);
};
