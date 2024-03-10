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

import { AddExpenseRow } from './AddExpenseRow';
import { Row } from './Row';

interface SheetWithExpenses extends Sheet {
	expenses: Expense[];
}

interface ExpensesSheetProps {
	sheetData: SheetWithExpenses;
}

export const ExpensesSheet = ({ sheetData }: ExpensesSheetProps) => {
	return (
		<Table className='md:text-xl mb-12'>
			<TableCaption>{sheetData.name}</TableCaption>
			<TableHeader>
				<TableRow className='bg-neutral-200 hover:bg-neutral-200'>
					<TableHead className='text-center'>Título</TableHead>
					<TableHead className='text-center'>Quantia</TableHead>
					<TableHead className='text-center'>Data</TableHead>
					<TableHead className='text-center'>Ações</TableHead>
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
						{sheetData.expenses.map((expense) => (
							<Row
								key={expense.id}
								expense={expense}
							/>
						))}
					</>
				)}
				<AddExpenseRow />
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
	);
};
