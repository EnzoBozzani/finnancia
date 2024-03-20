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

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesSheetProps {
	sheetData: SheetWithFinances;
}

export const FinancesSheet = ({ sheetData }: FinancesSheetProps) => {
	return (
		<div className='hidden lg:block max-w-screen-xl rounded-xl border border-neutral-200 w-[90%] mx-auto mb-12'>
			<Table className='md:text-lg'>
				<TableCaption className='mt-0 py-4 text-xl text-white bg-green-700 rounded-b-xl'>
					{sheetData.name}
				</TableCaption>
				<TableHeader className='rounded-t-xl'>
					<TableRow className='bg-green-700 hover:bg-green-700 rounded-t-xl'>
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
									className='text-center font-semibold py-6 bg-neutral-100'
									colSpan={4}
								>
									Nenhuma finança encontrada nessa planilha
								</TableCell>
							</TableRow>
						</>
					) : (
						<>
							{sheetData.finances.map((finance, i) => (
								<Row
									key={finance.id}
									finance={finance}
									i={i}
								/>
							))}
						</>
					)}
				</TableBody>
				<TableFooter>
					<TableRow className='bg-green-700 hover:bg-green-700 text-white'>
						<TableCell colSpan={3}>Saldo total:</TableCell>
						<TableCell
							className={cn('text-right', sheetData.totalAmount >= 0 ? 'text-white' : 'text-red-500')}
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
