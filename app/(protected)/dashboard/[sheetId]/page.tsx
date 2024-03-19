import { redirect } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { ExpensesSheet } from '@/components/ExpensesSheet';
import { ExpensesMobileTable } from '@/components/ExpensesMobileTable';

import { AddExpenseButton } from './_components/AddExpenseButton';

export async function generateMetadata({ params }: { params: { sheetId: string } }) {
	const user = await currentUser();

	const sheetData = await db.sheet.findUnique({
		where: { id: params.sheetId, userId: user?.id },
		select: { name: true },
	});

	return {
		title: sheetData?.name,
	};
}

const SheetPage = async ({ params }: { params: { sheetId: string } }) => {
	const user = await currentUser();

	const sheetData = await db.sheet.findUnique({
		where: { id: params.sheetId, userId: user?.id },
		include: {
			expenses: {
				orderBy: {
					order: 'asc',
				},
			},
		},
	});

	if (!sheetData) {
		redirect('/dashboard');
	}

	return (
		<main>
			<h1 className='text-center my-6 sm:mt-0 md:mb-12 text-3xl'>{sheetData.name}</h1>
			<ExpensesSheet sheetData={sheetData} />
			<ExpensesMobileTable sheetData={sheetData} />
			<AddExpenseButton sheetMonth={sheetData.name} />
		</main>
	);
};

export default SheetPage;
