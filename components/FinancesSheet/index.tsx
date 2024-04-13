'use client';

import { Finance, Sheet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { IoSearch, IoTrashOutline } from 'react-icons/io5';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, currencyFormat, splitFinancesInGroupsOf8 } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { Row } from './Row';
import { Pagination } from './Pagination';
import { useDeleteSheetModal } from '@/hooks/useDeleteSheetModal';
import { sheetsService } from '@/services/sheetsService';
import { toast } from 'sonner';
import { Loader } from '../Loader';
import { financesService } from '@/services/financesService';
import { Input } from '../ui/input';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesSheetProps {
	sheetData: SheetWithFinances;
}

interface FinancesData {
	finances: Finance[];
	financesCount: number;
	sheetId: string;
}

export const FinancesSheet = ({ sheetData }: FinancesSheetProps) => {
	const isDark = useIsDarkTheme();

	const [selectedPage, setSelectedPage] = useState(0);
	const [financesData, setFinancesData] = useState<FinancesData>({
		finances: sheetData.finances,
		financesCount: sheetData.financesCount,
		sheetId: sheetData.id,
	});
	const [isLoading, setIsLoading] = useState(false);
	const filterRef = useRef<HTMLInputElement | null>(null);

	const onOpenDeleteSheetModal = useDeleteSheetModal((state) => state.onOpen);

	const fetchData = async (filter: string) => {
		setIsLoading(true);
		const res = await financesService.getPaginatedFinances(sheetData.id, selectedPage, filter);

		if (res.error || res.sheetId !== sheetData.id) {
			toast.error('Algo deu errado!');
			setIsLoading(false);
			return;
		}

		setFinancesData(() => {
			let idCounter = 0;

			while (res.finances.length < 8 && res.finances.length > 0) {
				res.finances.push({
					id: `fake-id-${idCounter}`,
					amount: 0,
					date: '',
					order: 0,
					sheetId: sheetData.id,
					title: '',
					type: 'EXPENSE',
				});
				idCounter++;
			}

			return res;
		});

		setIsLoading(false);
	};

	useEffect(() => {
		fetchData('');
	}, [selectedPage, sheetData]);

	const onSubmit = (formData: FormData) => {
		const filter = formData.get('filter') as string;

		if (!filterRef.current) return;

		fetchData(filter);

		filterRef.current.value = '';
	};

	return (
		<div className='hidden lg:block'>
			<div className='flex items-center justify-between mb-6'>
				<div></div>
				<h1 className='font-semibold text-3xl text-green-600 flex items-center justify-center gap-x-2'>
					{sheetData.name}
					<button
						onClick={() => {
							onOpenDeleteSheetModal(sheetData);
						}}
					>
						<IoTrashOutline
							className={cn(
								'w-8 h-8 hover:text-red-500',
								isDark ? 'text-neutral-700' : 'text-neutral-300'
							)}
						/>
					</button>
				</h1>
				<form
					action={onSubmit}
					className={cn('flex items-center', isDark ? 'text-white' : 'text-black')}
				>
					<input
						id='filter'
						name='filter'
						className={cn(
							'bg-transparent w-[130px] border-b-2 p-2 outline-none focus:border-noe focus:outline-none text-sm',
							isDark
								? 'border-b-neutral-700 placeholder:text-neutrao-300'
								: 'border-b-neutral-300 placeholder:text-neutral-700'
						)}
						placeholder='Filtrar'
						ref={filterRef}
					/>
					<button type='submit'>
						<IoSearch className={cn('w-6 h-6 hover:opacity-50')} />
					</button>
				</form>
			</div>
			<div className={cn('max-w-screen-xl w-[95%] mx-auto')}>
				<Table className='text-lg'>
					<TableHeader className='py-4'>
						<TableRow
							className={cn(
								'border-b outline-none text-lg',
								isDark
									? 'bg-neutral-950 hover:bg-neutral-900 border-neutral-700'
									: 'bg-white hover:bg-neutral-100 border-neutral-300'
							)}
						>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Título
							</TableHead>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Quantia
							</TableHead>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Data
							</TableHead>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody
						style={{
							maxHeight: '300px',
							overflowY: 'scroll',
						}}
					>
						{isLoading ? (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										className={cn(
											'text-center font-semibold h-[520px]',
											isDark ? 'bg-neutral-950 text-white' : 'bg-white'
										)}
									>
										<div className='flex items-center justify-center'>
											<Loader />
										</div>
									</TableCell>
								</TableRow>
							</>
						) : !financesData.finances || financesData.finances.length === 0 ? (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										className={cn(
											'text-center font-semibold h-[520px]',
											isDark ? 'bg-neutral-950 text-white' : 'bg-white'
										)}
									>
										Nenhuma finança encontrada nessa planilha
									</TableCell>
								</TableRow>
							</>
						) : (
							<>
								{financesData.finances.map((finance) => (
									<Row
										key={finance.id}
										finance={finance}
									/>
								))}
							</>
						)}
					</TableBody>
					<TableFooter className='border-none outline-none'>
						<TableRow
							className={cn(
								'outline-none border-t',
								isDark
									? 'bg-neutral-950 hover:bg-neutral-900 border-neutral-700 text-white'
									: 'bg-white hover:bg-neutral-100 border-neutral-300'
							)}
						>
							<TableCell colSpan={3}>Saldo total:</TableCell>
							<TableCell
								className={cn(
									'text-right font-semibold',
									sheetData.totalAmount >= 0
										? isDark
											? 'text-green-400'
											: 'text-green-700'
										: isDark
										? 'text-red-400'
										: 'text-red-700'
								)}
							>
								{currencyFormat(sheetData.totalAmount)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<Pagination
				numberOfGroups={Math.ceil(financesData.financesCount / 8)}
				selectedPage={selectedPage}
				setSelectedPage={setSelectedPage}
			/>
		</div>
	);
};
