import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { ExpensesSheet } from './_components/ExpensesSheet';

const DashboardPage = async ({ params }: { params: { sheetId: string } }) => {
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
			<ExpensesSheet sheetData={sheetData} />
		</div>
	);
};

export default DashboardPage;
