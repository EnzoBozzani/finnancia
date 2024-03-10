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

interface SheetWithExpenses extends Sheet {
	expenses: Expense[];
}

interface ExpensesSheetProps {
	sheetData: SheetWithExpenses;
}

export const ExpensesSheet = ({ sheetData }: ExpensesSheetProps) => {
	const BRCurrency = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	return (
		<Table className='md:text-xl'>
			<TableCaption>{sheetData.name}</TableCaption>
			<TableHeader>
				<TableRow className='bg-neutral-200 hover:bg-neutral-200'>
					<TableHead className='text-center'>Título</TableHead>
					<TableHead className='text-center'>Quantia</TableHead>
					<TableHead className='text-center'>Data</TableHead>
					<TableHead className='text-center'>Deletar</TableHead>
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
							<TableRow key={expense.id}>
								<TableCell className='text-center'>{expense.title}</TableCell>
								<TableCell className='text-center'>{BRCurrency.format(expense.amount)}</TableCell>
								<TableCell className='text-center'>{expense.date}</TableCell>
								<TableCell></TableCell>
							</TableRow>
						))}
					</>
				)}
				<AddExpenseRow />
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className='text-right'>{BRCurrency.format(sheetData.totalAmount)}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
