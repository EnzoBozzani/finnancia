'use client';

import { FinanceType } from '@prisma/client';
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
}

export const DashboardChart = ({
	sheets,
}: {
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
}) => {
	const isDark = useIsDarkTheme();

	const formattedSheets = sheets.map((sheet) => ({
		name: sheet.name,
		expenseAmount: sheet.finances.reduce(
			(current, finance) => (finance.type === 'EXPENSE' ? current + finance.amount : current),
			0
		),
		profitAmount: sheet.finances.reduce(
			(current, finance) => (finance.type === 'PROFIT' ? current + finance.amount : current),
			0
		),
		amount: sheet.totalAmount,
	}));

	const options: ChartOptions<'line'> = {
		responsive: true,
		color: isDark ? '#d4d4d4' : '#404040',
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			title: {
				display: true,
				text: 'Gasto e lucro (últimos 6 meses)',
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
		labels: formattedSheets.map((sheet) => sheet.name),
		datasets: [
			{
				label: 'Gasto por mês',
				data: formattedSheets.map((sheet) => sheet.expenseAmount),
				borderColor: '#dc2626',
				backgroundColor: '#dc2626',
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
