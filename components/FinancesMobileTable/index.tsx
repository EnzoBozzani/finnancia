'use client';

import { Finance, Sheet } from '@prisma/client';
import { IoTrashOutline } from 'react-icons/io5';

import { useDeleteSheetModal } from '@/hooks/useDeleteSheetModal';
import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { FinancesMobileRow } from './FinancesMobileRow';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesMobileTableProps {
	sheetData: SheetWithFinances;
}

export const FinancesMobileTable = ({ sheetData }: FinancesMobileTableProps) => {
	const isDark = useIsDarkTheme();

	const onOpenDeleteSheetModal = useDeleteSheetModal((state) => state.onOpen);

	return (
		<section className='block lg:hidden mb-6'>
			<h1 className='font-semibold text-center mb-6 text-2xl text-green-600 flex items-center justify-center gap-x-2'>
				{sheetData.name}
				<button
					onClick={() => {
						onOpenDeleteSheetModal(sheetData);
					}}
				>
					<IoTrashOutline
						className={cn('w-8 h-8 hover:text-red-500', isDark ? 'text-neutral-700' : 'text-neutral-300')}
					/>
				</button>
			</h1>
			{sheetData.finances.length === 0 ? (
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
					{sheetData.finances.map((finance) => (
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
		</section>
	);
};
