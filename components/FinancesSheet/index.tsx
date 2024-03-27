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
		<div className='hidden lg:block'>
			<h1 className='font-semibold text-center mb-6 text-3xl text-green-600'>{sheetData.name}</h1>
			<div className={cn('max-w-screen-xl rounded-t-xl w-[95%] mx-auto mb-12')}>
				<Table className='text-lg'>
					<TableHeader className='py-4'>
						<TableRow
							className={cn(
								'rounded-t-xl border-none outline-none',
								isDark ? 'bg-neutral-800 hover:bg-neutral-800' : 'bg-neutral-200 hover:bg-neutral-200'
							)}
						>
							<TableHead
								className={cn(
									'text-center rounded-tl-xl text-neutral-100',
									isDark ? 'text-white' : 'text-black'
								)}
							>
								Título
							</TableHead>
							<TableHead
								className={cn('text-center text-neutral-100', isDark ? 'text-white' : 'text-black')}
							>
								Quantia
							</TableHead>
							<TableHead
								className={cn('text-center text-neutral-100', isDark ? 'text-white' : 'text-black')}
							>
								Data
							</TableHead>
							<TableHead
								className={cn(
									'text-center rounded-tr-xl text-neutral-100',
									isDark ? 'text-white' : 'text-black'
								)}
							>
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
					<TableFooter className='border-none outline-none rounded-b-xl'>
						<TableRow
							className={cn(
								'outline-none border-none rounded-b-xl',
								isDark
									? 'bg-neutral-800 hover:bg-neutral-800 text-white'
									: 'bg-neutral-200 hover:bg-neutral-200 text-black'
							)}
						>
							<TableCell
								className='rounded-bl-xl'
								colSpan={3}
							>
								Saldo total:
							</TableCell>
							<TableCell
								className={cn(
									'text-right rounded-br-xl',
									sheetData.totalAmount >= 0 ? 'text-green-400' : 'text-red-500'
								)}
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
		</div>
	);
};
