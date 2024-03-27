'use client';

import { Finance, Sheet } from '@prisma/client';

import { cn } from '@/lib/utils';

import { FinancesMobileRow } from './FinancesMobileRow';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesMobileTableProps {
	sheetData: SheetWithFinances;
}

export const FinancesMobileTable = ({ sheetData }: FinancesMobileTableProps) => {
	const isDark = useIsDarkTheme();

	return (
		<section className='block lg:hidden mb-6'>
			<h1 className='font-semibold text-center mb-6 text-2xl text-green-600'>{sheetData.name}</h1>
			{sheetData.finances.length === 0 ? (
				<>
					<div className='w-full p-4 bg-white border-t text-center font-semibold'>
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
					'w-full grid grid-cols-2 gap-x-2 p-4 border-t',
					isDark ? 'bg-neutral-900 text-white' : 'bg-neutral-100'
				)}
			>
				<p className='text-sm font-semibold'>Saldo total:</p>
				<p
					className={cn(
						'text-red-600 text-sm break-all font-semibold text-end',
						sheetData.totalAmount >= 0 ? 'text-green-500' : 'text-red-500'
					)}
				>
					{sheetData.totalAmount.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</p>
			</div>
		</section>
	);
};
