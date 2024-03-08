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

interface SheetWithExpenses extends Sheet {
	expenses: Expense[];
}

interface ExpensesSheetProps {
	sheetData: SheetWithExpenses;
}

export const ExpensesSheet = ({ sheetData }: ExpensesSheetProps) => {
	return (
		<Table className='md:text-xl'>
			<TableCaption>{sheetData.name}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Título</TableHead>
					<TableHead>Quantia</TableHead>
					<TableHead>Data</TableHead>
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
								<TableCell>{expense.title}</TableCell>
								<TableCell>{expense.amount}</TableCell>
								<TableCell>{expense.date.toDateString()}</TableCell>
							</TableRow>
						))}
					</>
				)}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2}>Total</TableCell>
					<TableCell className='text-right'>{sheetData.totalAmount}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
