'use client';

import { Finance, Sheet } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { IoSearch, IoTrashOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useDeleteSheetModal } from '@/hooks/useDeleteSheetModal';
import { financesService } from '@/services/financesService';
import { ExportReport } from '@/app/(protected)/dashboard/[sheetId]/_components/ExportReport';

import { Row } from './Row';
import { Pagination } from './Pagination';
import { Skeleton } from '../ui/skeleton';

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
	const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [finalMousePosition, setFinalMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [currentFilter, setCurrentFilter] = useState('');
	const [totalAmount, setTotalAmount] = useState(sheetData.totalAmount);
	const filterRef = useRef<HTMLInputElement | null>(null);

	const onOpenDeleteSheetModal = useDeleteSheetModal((state) => state.onOpen);

	const fetchData = async (filter: string) => {
		setIsLoading(true);
		const res = await financesService.getPaginatedFinances(sheetData.id, selectedPage, filter);

		if (res.error || res.sheetId !== sheetData.id) {
			toast.error('Algo deu errado');
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

		if (filter === '') {
			setTotalAmount(sheetData.totalAmount);
		} else {
			setTotalAmount(res.financesAmount);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		fetchData(currentFilter);
	}, [selectedPage, sheetData]);

	const onSubmit = (formData: FormData) => {
		const filter = formData.get('filter') as string;

		if (!filterRef.current) return;

		setCurrentFilter(filter);

		setSelectedPage(0);
		fetchData(filter);
	};

	return (
		<div className='hidden lg:block'>
			<div className='max-w-screen-xl w-[95%] mx-auto flex items-center justify-between mb-6'>
				<ExportReport sheetId={sheetData.id} />
				<h1
					className={cn(
						'font-black text-3xl flex items-center justify-center gap-x-2 uppercase',
						isDark && 'text-white'
					)}
				>
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
					<button
						onClick={() => {
							if (!filterRef.current || filterRef.current.value === '') return;

							filterRef.current.value = '';
							setCurrentFilter('');
							setSelectedPage(0);
							fetchData('');
						}}
						type='button'
					>
						<IoIosCloseCircleOutline className={cn('w-6 h-6 hover:opacity-50')} />
					</button>
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
						maxLength={10}
					/>
					<button type='submit'>
						<IoSearch className={cn('w-6 h-6 hover:opacity-50')} />
					</button>
				</form>
			</div>
			<div
				className={cn('max-w-screen-xl w-[95%] mx-auto')}
				onMouseDown={(ev) => {
					setInitialMousePosition({ x: ev.pageX, y: ev.pageY });
				}}
				onMouseUp={(ev) => {
					setFinalMousePosition({ x: ev.pageX, y: ev.pageY });
					if (
						initialMousePosition.x - finalMousePosition.x > 30 &&
						Math.abs(initialMousePosition.y - finalMousePosition.y) < 50
					) {
						setSelectedPage((current) =>
							current === Math.ceil(financesData.financesCount / 8) - 1 ||
							Math.ceil(financesData.financesCount / 8) === 0
								? current
								: current + 1
						);
					}
					if (
						finalMousePosition.x - initialMousePosition.x > 30 &&
						Math.abs(initialMousePosition.y - finalMousePosition.y) < 50
					) {
						setSelectedPage((current) => (current === 0 ? current : current - 1));
					}
				}}
			>
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
								Categoria
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
							overflowY: 'scroll',
						}}
					>
						{isLoading ? (
							<>
								{[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
									<TableRow
										className={cn(
											'outline-none border-b h-[65px]',
											isDark
												? 'bg-neutral-950 text-white hover:bg-neutral-950 border-neutral-700'
												: 'bg-white text-black hover:bg-white border-neutral-300'
										)}
										key={value}
									>
										<TableCell className='w-[40%]'>
											<Skeleton className='w-[60%] h-[40px] mx-auto' />
										</TableCell>
										<TableCell>
											<Skeleton className='w-[60%] h-[40px] mx-auto' />
										</TableCell>
										<TableCell>
											<Skeleton className='w-[60%] h-[40px] mx-auto' />
										</TableCell>
										<TableCell>
											<Skeleton className='w-[60%] h-[40px] mx-auto' />
										</TableCell>
										<TableCell>
											<Skeleton className='w-12 h-12 rounded-full mx-auto' />
										</TableCell>
									</TableRow>
								))}
							</>
						) : !financesData.finances || financesData.finances.length === 0 ? (
							<>
								<TableRow>
									<TableCell
										colSpan={5}
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
							<TableCell colSpan={4}>
								Saldo total{currentFilter && ` (Pesquisa: "${currentFilter}")`}:
							</TableCell>
							<TableCell
								className={cn(
									'text-right font-semibold',
									totalAmount >= 0
										? isDark
											? 'text-green-400'
											: 'text-green-700'
										: isDark
										? 'text-red-400'
										: 'text-red-700'
								)}
							>
								{currencyFormat(totalAmount)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<Pagination
				numberOfGroups={Math.ceil(financesData.financesCount / 8)}
				selectedPage={selectedPage}
				setSelectedPage={setSelectedPage}
				isLoading={isLoading}
			/>
		</div>
	);
};
