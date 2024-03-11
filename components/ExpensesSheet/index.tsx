import { Expense, Sheet } from '@prisma/client';

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

import { Row } from './Row';

interface SheetWithExpenses extends Sheet {
	expenses: Expense[];
}

interface ExpensesSheetProps {
	sheetData: SheetWithExpenses;
}

export const ExpensesSheet = ({ sheetData }: ExpensesSheetProps) => {
	return (
		<div className='max-w-screen-xl rounded-xl border border-neutral-200 w-[90%] mx-auto mb-12'>
			<Table className='md:text-xl'>
				<TableCaption className='pb-4 text-xl'>{sheetData.name}</TableCaption>
				<TableHeader className='rounded-t-xl'>
					<TableRow className='bg-neutral-800 hover:bg-neutral-800 rounded-t-xl'>
						<TableHead className='text-center rounded-tl-xl text-white '>Título</TableHead>
						<TableHead className='text-center text-white '>Quantia</TableHead>
						<TableHead className='text-center text-white '>Data</TableHead>
						<TableHead className='text-center rounded-tr-xl text-white'>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sheetData.expenses.length === 0 ? (
						<>
							<TableRow>
								<TableCell
									className='text-center font-semibold py-6'
									colSpan={3}
								>
									Nenhuma despesa encontrada nessa planilha
								</TableCell>
							</TableRow>
						</>
					) : (
						<>
							{sheetData.expenses.map((expense, i) => (
								<Row
									key={expense.id}
									expense={expense}
									i={i}
								/>
							))}
						</>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className='text-right'>
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
