'use client';

import { Finance, Sheet } from '@prisma/client';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { Row } from './Row';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesSheetProps {
	sheetData: SheetWithFinances;
}

export const FinancesSheet = ({ sheetData }: FinancesSheetProps) => {
	const isDark = useIsDarkTheme();

	return (
		<div
			className={cn(
				'hidden lg:block max-w-screen-xl rounded-xl border w-[90%] mx-auto mb-12',
				isDark ? 'border-neutral-900' : 'border-neutral-200'
			)}
		>
			<Table className='md:text-lg'>
				<TableCaption className='mt-0 py-4 text-xl rounded-b-xl bg-neutral-600 hover:bg-neutral-600 text-neutral-100'>
					{sheetData.name}
				</TableCaption>
				<TableHeader className='rounded-t-xl py-4'>
					<TableRow className='rounded-t-xl bg-neutral-600 hover:bg-neutral-600'>
						<TableHead className='text-center border-none outline-none rounded-tl-xl text-neutral-100'>
							Título
						</TableHead>
						<TableHead className='text-center border-none outline-none text-neutral-100'>Quantia</TableHead>
						<TableHead className='text-center border-none outline-none text-neutral-100'>Data</TableHead>
						<TableHead className='text-center border-none outline-none rounded-tr-xl text-neutral-100'>
							Ações
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sheetData.finances.length === 0 ? (
						<>
							<TableRow>
								<TableCell
									className={cn(
										'text-center font-semibold py-6',
										isDark ? 'bg-neutral-900 text-white' : 'bg-neutral-100'
									)}
									colSpan={4}
								>
									Nenhuma finança encontrada nessa planilha
								</TableCell>
							</TableRow>
						</>
					) : (
						<>
							{sheetData.finances.map((finance) => (
								<Row
									key={finance.id}
									finance={finance}
								/>
							))}
						</>
					)}
				</TableBody>
				<TableFooter>
					<TableRow className='outline-none border-none bg-neutral-600 hover:bg-neutral-600 text-neutral-100'>
						<TableCell colSpan={3}>Saldo total:</TableCell>
						<TableCell
							className={cn('text-right', sheetData.totalAmount >= 0 ? 'text-green-400' : 'text-red-500')}
						>
							{sheetData.totalAmount.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
};
