'use client';

import { Chart as ChartJS, ChartData, ChartOptions, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Finance, Category } from '@prisma/client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';
import { useScreenWidth } from '@/hooks/useScreenWidth';

ChartJS.register(ArcElement);

interface SheetPieChartProps {
	finances: (Finance & { category?: Category })[];
}

export const SheetPieChart = ({ finances }: SheetPieChartProps) => {
	const isDark = useIsDarkTheme();

	const width = useScreenWidth();

	const names: string[] = [];
	const colors: string[] = [];
	const amounts: number[] = [];

	for (let i = 0; i < finances.length; i++) {
		if (!finances[i].category) {
			if (names.includes('Sem categoria')) {
				const index = names.indexOf('Sem categoria');
				amounts[index] += finances[i].amount;
			} else {
				names.push('Sem categoria');
				colors.push('#000000');
				amounts.push(finances[i].amount);
			}
		}

		if (finances[i].category) {
			if (names.includes(finances[i].category!.name)) {
				const index = names.indexOf(finances[i].category!.name);
				amounts[index] += finances[i].amount;
			} else {
				names.push(finances[i].category!.name);
				colors.push(finances[i].category!.color);
				amounts.push(finances[i].amount);
			}
		}
	}

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
		labels: names,
		datasets: [
			{
				label: 'Categorias',
				data: amounts,
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
				],
				hoverOffset: 4,
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
		<div
			className={cn(
				'flex flex-col justify-center items-center w-[500px] mx-auto rounded-xl border p-4 mb-12',
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
