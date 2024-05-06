'use client';

import { Finance, Sheet } from '@prisma/client';
import { IoSearch, IoTrashOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { financesService } from '@/services/financesService';
import { useDeleteSheetModal } from '@/hooks/useDeleteSheetModal';
import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { FinancesMobileRow } from './FinancesMobileRow';
import { Pagination } from '../FinancesSheet/Pagination';
import { Skeleton } from '../ui/skeleton';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesMobileTableProps {
	sheetData: SheetWithFinances;
}

interface FinancesData {
	finances: Finance[];
	financesCount: number;
	sheetId: string;
}

export const FinancesMobileTable = ({ sheetData }: FinancesMobileTableProps) => {
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
			toast.error('Algo deu errado!');
			setIsLoading(false);
			return;
		}

		setFinancesData(res);

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
		<section className='block lg:hidden mb-6'>
			<div className='max-w-screen-xl w-[95%] mx-auto flex flex-col items-center justify-center gap-y-3 mb-6'>
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
							'bg-transparent w-[160px] border-b-2 p-2 outline-none focus:border-noe focus:outline-none text-sm',
							isDark
								? 'border-b-neutral-700 placeholder:text-neutrao-300'
								: 'border-b-neutral-300 placeholder:text-neutral-700'
						)}
						placeholder='Filtrar por título'
						ref={filterRef}
						maxLength={10}
					/>
					<button type='submit'>
						<IoSearch className={cn('w-6 h-6 hover:opacity-50')} />
					</button>
				</form>
			</div>
			<div
				onTouchStart={(ev) => {
					const touch = ev.touches[0] || ev.changedTouches[0];
					setInitialMousePosition({ x: touch.pageX, y: touch.pageY });
				}}
				onTouchEnd={(ev) => {
					const touch = ev.touches[0] || ev.changedTouches[0];
					setFinalMousePosition({ x: touch.pageX, y: touch.pageY });
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
				{isLoading ? (
					<>
						{[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
							<div
								className={cn(
									'h-[93px] w-full grid grid-cols-2 gap-x-2 p-4 border-b',
									isDark
										? 'bg-neutral-950 text-white border-neutral-700'
										: 'bg-white text-black border-neutral-300'
								)}
								key={value}
							>
								<div className='flex flex-col items-start justify-center gap-y-2'>
									<Skeleton className='w-[70%] h-[30px]' />
									<Skeleton className='w-[30%] h-[20px]' />
								</div>
								<div className='flex flex-col items-end justify-center gap-y-2'>
									<Skeleton className='w-[40%] h-[30px]' />
									<Skeleton className='w-8 h-8 rounded-full' />
								</div>
							</div>
						))}
					</>
				) : financesData.finances.length === 0 ? (
					<>
						<div
							className={cn(
								'w-full p-4 bg-white border-b text-center font-semibold',
								isDark
									? 'bg-neutral-950 text-white border-neutral-700'
									: 'bg-white text-black border-neutral-300'
							)}
						>
							Nenhuma finança encontrada
						</div>
					</>
				) : (
					<>
						{financesData.finances.map((finance) => (
							<FinancesMobileRow
								finance={finance}
								key={finance.id}
							/>
						))}
					</>
				)}
			</div>
			<div
				className={cn(
					'w-full grid grid-cols-2 gap-x-2 p-4',
					isDark ? 'bg-neutral-950 text-white border-neutral-700' : 'bg-white text-black border-neutral-300'
				)}
			>
				<p className='text-sm font-semibold'>
					Saldo total{currentFilter && ` (Pesquisa: "${currentFilter}")`}:
				</p>
				<p
					className={cn(
						'text-red-600 text-sm break-all font-semibold text-end',
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
				</p>
			</div>
			<Pagination
				numberOfGroups={Math.ceil(financesData.financesCount / 8)}
				selectedPage={selectedPage}
				setSelectedPage={setSelectedPage}
				isMobile
				isLoading={isLoading}
			/>
		</section>
	);
};
