import { Sheet } from '@prisma/client';

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

interface ExpensesSheetProps {
	sheetData: Sheet;
}

export const ExpensesSheet = ({ sheetData }: ExpensesSheetProps) => {
	return (
		<Table>
			<TableCaption>{sheetData.name}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className='text-right'>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className='font-medium'></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell className='text-right'></TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className='text-right'>{sheetData.totalAmount}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
