'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Finance } from '@prisma/client';

import { sheetsService } from '@/services/sheetsService';
import { cn, currencyFormat, orderYearsForSelectSheet } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectGroup,
	SelectValue,
	SelectLabel,
	SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { Year } from '../../_components/Sidebar';

export const ExportCSV = () => {
	const [sheets, setSheets] = useState<Year[]>([]);
	const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const isDark = useIsDarkTheme();

	useEffect(() => {
		const fetchData = async () => {
			const res = await sheetsService.getUserSheetsAndIsInitialAmountSet();

			if (res.error) {
				toast.error(res.error);
				return;
			}

			const orderedYears = orderYearsForSelectSheet(res.sheets);

			setSheets(orderedYears);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<div
			className={cn(
				'flex flex-col gap-y-4 mx-auto w-[95%] border rounded-xl p-4',
				isDark ? 'text-white border-neutral-700 bg-neutral-900' : 'text-black bg-neutral-100'
			)}
		>
			<div className={cn('flex flex-col sm:flex-row items-center justify-between gap-6')}>
				<div>
					<h2 className='text-center sm:text-start text-base sm:text-lg font-semibold'>EXPORTAR COMO CSV</h2>
					<p className='text-center sm:text-start text-xs sm:text-sm text-neutral-500'>
						Escolha a planilha a ser exportada
					</p>
				</div>
				{isLoading ? (
					<Skeleton className='w-[240px] sm:w-[400px] h-12' />
				) : sheets.length === 0 ? (
					<div className='font-bold border rounded-lg text-base sm:text-lg px-2 py-4 w-[240px] sm:w-[400px]'>
						<p className='text-center'>Você não tem planilhas</p>
					</div>
				) : (
					<Select
						onValueChange={(value) => {
							setSelectedSheetId(value);
						}}
					>
						<SelectTrigger
							className={cn(
								'w-[240px] sm:w-[400px] text-base sm:text-lg py-6',
								isDark && 'border-neutral-800'
							)}
						>
							<SelectValue placeholder='Selecionar planilha' />
						</SelectTrigger>
						<SelectContent
							className={cn('h-[200px]', isDark && 'bg-neutral-950 border-neutral-800 text-neutral-100')}
						>
							{sheets.map((year, index: number) => (
								<SelectGroup key={year.order + '-' + index}>
									<SelectLabel className='text-lg font-bold text-center'>{year.order}</SelectLabel>
									{year.sheets.map((sheet) => (
										<SelectItem
											key={`${sheet.id}-${index}`}
											value={sheet.id}
											className={cn(
												'cursor-pointer',
												isDark ? 'focus:bg-neutral-900 focus:text-neutral-100' : ''
											)}
										>
											{sheet.name}
										</SelectItem>
									))}
								</SelectGroup>
							))}
						</SelectContent>
					</Select>
				)}
			</div>
			<div className='w-full flex justify-center items-center'>
				<Button
					onClick={async () => {
						setIsLoading(true);
						if (!sheets || sheets.length === 0) {
							toast.error('Você ainda não tem planilhas');
							setIsLoading(false);
							return;
						}

						if (!selectedSheetId || selectedSheetId === '') {
							toast.error('Selecione uma planilha');
							setIsLoading(false);
							return;
						}

						const res = await sheetsService.getSheetById(selectedSheetId);

						if (res.error) {
							toast.error('Erro ao exportar a planilha!');
							setIsLoading(false);
							return;
						}

						const finances = res.sheet.finances as Finance[];

						let csv = finances
							.map(
								(finance) =>
									`${finance.title},${finance.type === 'PROFIT' ? '+' : '-'}${finance.amount},${
										finance.date
									}`
							)
							.join('\n');

						csv = `Título,Valor,Data\n${csv}`;

						const link = document.createElement('a');
						link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
						link.download = `${res.sheet.name.replace('/', '-')}.csv`;
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
						setIsLoading(false);
					}}
					size={'lg'}
					disabled={isLoading}
				>
					Exportar
				</Button>
			</div>
		</div>
	);
};
