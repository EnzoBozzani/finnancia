import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { ExpensesSheet } from '@/components/ExpensesSheet';
import { AddExpenseButton } from './_components/AddExpenseButton';

const SheetPage = async ({ params }: { params: { sheetId: string } }) => {
	const user = await currentUser();

	const sheetData = await db.sheet.findUnique({
		where: { id: params.sheetId, userId: user?.id },
		include: {
			expenses: true,
		},
	});

	if (!sheetData) {
		//alguma lógica para criar a sheet caso o usuário não tenha planilha ainda
		return;
	}

	return (
		<div>
			<h1 className='text-center mt-6 sm:mt-0 mb-12 text-3xl'>{sheetData.name}</h1>
			<ExpensesSheet sheetData={sheetData} />
			<AddExpenseButton />
		</div>
	);
};

export default SheetPage;
