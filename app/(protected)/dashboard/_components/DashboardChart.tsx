'use client';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FinanceType } from '@prisma/client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, currencyFormat } from '@/lib/utils';
import { useScreenWidth } from '@/hooks/useScreenWidth';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DashboardChartProps {
	labels: string[];
	datasets: number[][];
	datasetsLabels: string[];
	colors: string[];
	sheets: ({
		finances: {
			amount: number;
			type: FinanceType;
		}[];
	} & {
		id: string;
		name: string;
		userId: string;
		totalAmount: number;
		order: number;
	})[];
}

export const DashboardChart = ({ labels, datasetsLabels, datasets, colors, sheets }: DashboardChartProps) => {
	const isDark = useIsDarkTheme();

	const width = useScreenWidth();

	const options: ChartOptions<'line'> = {
		responsive: true,
		color: isDark ? '#d4d4d4' : '#404040',
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
		},
		scales: {
			x: {
				grid: {
					color: !isDark ? '#d4d4d4' : '#404040',
					drawTicks: false,
				},
				ticks: {
					padding: 10,
				},
			},
			y: {
				grid: {
					color: !isDark ? '#d4d4d4' : '#404040',
					drawTicks: false,
				},
				ticks: {
					callback(tickValue, index, ticks) {
						return currencyFormat(Number(tickValue));
					},
					padding: 10,
				},
			},
		},
	};

	const data: ChartData<'line'> = {
		labels,
		datasets: datasets.map((dataset, i) => ({
			data: dataset,
			label: datasetsLabels[i],
			backgroundColor: colors[i],
			borderColor: colors[i],
		})),
	};

	if (datasetsLabels.length === 0) {
		return (
			<p className={cn('font-semibold', isDark ? 'text-white' : 'text-black')}>
				Oops... Você ainda não possui planilhas
			</p>
		);
	}

	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center w-full rounded-xl border p-4',
				isDark ? 'border-neutral-700' : 'border-neutral-300'
			)}
		>
			<h1 className={cn('pb-4 text-lg font-bold', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
				GANHO, GASTO E SALDO MENSAL
			</h1>
			{width >= 640 ? (
				<Line
					options={options}
					data={data}
					className={cn('w-full')}
				/>
			) : (
				<div className='w-full'>
					{sheets.map((sheet, i) => (
						<div
							key={sheet.id}
							className={cn(
								'w-full bg-transparent border-t p-4 space-y-2',
								isDark ? 'text-white border-neutral-700' : 'border-neutral-300'
							)}
						>
							<div className='w-full'>
								<p className='uppercase font-bold text-sm'>{sheet.name}</p>
							</div>
							<div className='flex items-center justify-between font-semibold text-xs'>
								<p className={cn(isDark ? 'text-green-400' : 'text-green-700')}>
									+ {currencyFormat(datasets[1][i])}
								</p>
								<p className={cn(isDark ? 'text-red-400' : 'text-red-700')}>
									- {currencyFormat(datasets[2][i])}
								</p>
								<p className={cn(isDark ? 'text-sky-400' : 'text-sky-700')}>
									{currencyFormat(datasets[0][i])}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
