'use client';

import { useEffect, useState, useTransition } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Finance, Category } from '@prisma/client';
import { toast } from 'sonner';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn, getCategoriesDataFromFinances } from '@/lib/utils';
import { financesService } from '@/services/financesService';
import { Skeleton } from '@/components/ui/skeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SheetPieChart = ({ sheetId }: { sheetId: string }) => {
	const isDark = useIsDarkTheme();

	const [finances, setFinances] = useState<(Finance & { category?: Category })[]>([]);

	const [pending, startTransition] = useTransition();

	const { dataExpense, dataProfit, namesExpense, namesProfit } = getCategoriesDataFromFinances(finances, isDark);

	const options: ChartOptions<'pie'> = {
		color: isDark ? 'white' : 'black',
	};

	useEffect(() => {
		const fetchData = () => {
			startTransition(async () => {
				setFinances([]);

				const res = await financesService.getFinancesWithCategories(sheetId);

				if (res.error) {
					toast.error(res.error);
					return;
				}

				setFinances(res.finances);
			});
		};
		fetchData();
	}, []);

	if (pending) {
		<div className='w-[95%] mx-auto flex items-center justify-evenly gap-x-2 mb-12'>
			<Skeleton className='w-[400px] h-[400px] rounded-xl' />
			<Skeleton className='w-[400px] h-[400px] rounded-xl' />
		</div>;
	}

	return (
		<div className='flex flex-col sm:flex-row items-center justify-evenly gap-2 mb-12'>
			<div
				className={cn(
					'flex flex-col justify-center items-center w-[95%] sm:w-[45%] rounded-xl border p-4',
					isDark ? 'border-neutral-700' : 'border-neutral-300'
				)}
			>
				<h1
					className={cn(
						'text-base md:text-lg font-bold text-center uppercase',
						isDark ? 'text-white' : 'text-neutral-700'
					)}
				>
					Gastos por Categoria
				</h1>
				{namesExpense.length === 0 ? (
					<p className={cn('text-center mt-12', isDark ? 'text-white' : 'text-black')}>
						Parece que não há gastos nessa planilha! :)
					</p>
				) : (
					<Pie
						data={dataExpense}
						options={options}
					/>
				)}
			</div>
			<div
				className={cn(
					'flex flex-col justify-center items-center w-[95%] sm:w-[45%] rounded-xl border p-4',
					isDark ? 'border-neutral-700' : 'border-neutral-300'
				)}
			>
				<h1
					className={cn(
						'text-base md:text-lg font-bold text-center uppercase',
						isDark ? 'text-white' : 'text-neutral-700'
					)}
				>
					Ganhos por Categoria
				</h1>
				{namesProfit.length === 0 ? (
					<p className={cn('text-center mt-12', isDark ? 'text-white' : 'text-black')}>
						Parece que não há ganhos nessa planilha! :(
					</p>
				) : (
					<Pie
						data={dataProfit}
						options={options}
					/>
				)}
			</div>
		</div>
	);
};
