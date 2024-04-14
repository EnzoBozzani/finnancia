'use client';

import { Finance, Sheet } from '@prisma/client';
import { IoSearch, IoTrashOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { financesService } from '@/services/financesService';
import { useDeleteSheetModal } from '@/hooks/useDeleteSheetModal';
import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { FinancesMobileRow } from './FinancesMobileRow';
import { Loader } from '../Loader';
import { Pagination } from '../FinancesSheet/Pagination';

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
					/>
					<button type='submit'>
						<IoSearch className={cn('w-6 h-6 hover:opacity-50')} />
					</button>
				</form>
			</div>
			{isLoading ? (
				<div className='flex items-center justify-center my-24'>
					<Loader />
				</div>
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
			<div
				className={cn(
					'w-full grid grid-cols-2 gap-x-2 p-4',
					isDark ? 'bg-neutral-950 text-white border-neutral-700' : 'bg-white text-black border-neutral-300'
				)}
			>
				<p className='text-sm font-semibold'>Saldo total:</p>
				<p
					className={cn(
						'text-red-600 text-sm break-all font-semibold text-end',
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
				</p>
			</div>
			<Pagination
				numberOfGroups={Math.ceil(financesData.financesCount / 8)}
				selectedPage={selectedPage}
				setSelectedPage={setSelectedPage}
			/>
		</section>
	);
};
