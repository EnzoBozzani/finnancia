'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Gasto e lucro (últimos 6 meses)',
		},
	},
};

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
	}));

	const data = {
		labels: formattedSheets.map((sheet) => sheet.name),
		datasets: [
			{
				label: 'Gasto por mês',
				data: formattedSheets.map((sheet) => sheet.expenseAmount),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Lucro por mês',
				data: formattedSheets.map((sheet) => sheet.profitAmount),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<Line
			options={options}
			data={data}
			className={cn('w-max', isDark ? 'bg-neutral-900' : 'bg-neutral-100')}
		/>
	);
};
