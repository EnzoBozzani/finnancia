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

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DashboardChartProps {
	title: string;
	labels: string[];
	dataset: number[];
	datasetLabel: string;
	color: string;
}

export const DashboardChart = ({ title, labels, datasetLabel, dataset, color }: DashboardChartProps) => {
	const isDark = useIsDarkTheme();

	const options: ChartOptions<'line'> = {
		responsive: true,
		color: isDark ? '#d4d4d4' : '#404040',
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			title: {
				display: true,
				text: title,
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
						return tickValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
					},
					padding: 10,
				},
			},
		},
	};

	const data: ChartData<'line'> = {
		labels,
		datasets: [
			{
				label: datasetLabel,
				data: dataset,
				borderColor: color,
				backgroundColor: color,
			},
		],
	};

	return (
		<Line
			options={options}
			data={data}
			className={cn('w-max h-auto')}
		/>
	);
};
