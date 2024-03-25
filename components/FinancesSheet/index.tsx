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
				<TableCaption
					className={cn('mt-0 py-4 text-xl rounded-b-xl', isDark ? 'text-white bg-black' : 'bg-white')}
				>
					{sheetData.name}
				</TableCaption>
				<TableHeader className='rounded-t-xl py-4'>
					<TableRow
						className={cn(
							'rounded-t-xl',
							isDark ? 'text-white bg-black hover:bg-black' : 'bg-white hover:bg-white'
						)}
					>
						<TableHead className='text-center rounded-tl-xl text-white '>Título</TableHead>
						<TableHead className='text-center text-white '>Quantia</TableHead>
						<TableHead className='text-center text-white '>Data</TableHead>
						<TableHead className='text-center rounded-tr-xl text-white'>Ações</TableHead>
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
					<TableRow
						className={cn(
							'outline-none border-none',
							isDark ? 'bg-black hover:bg-black text-white' : 'bg-white hover:bg-white'
						)}
					>
						<TableCell colSpan={3}>Saldo total:</TableCell>
						<TableCell
							className={cn('text-right', sheetData.totalAmount >= 0 ? 'text-green-500' : 'text-red-500')}
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
