import { currentUser } from '@/lib/auth';
import { ExpensesSheet } from './_components/ExpensesSheet';
import { sheetsService } from '@/services/sheetsService';

const DashboardPage = async ({ params }: { params: { sheetId: string } }) => {
	const user = await currentUser();

	const sheetData = await sheetsService.getSheetById(params.sheetId);

	console.log(sheetData);

	return (
		<div>
			<ExpensesSheet sheetData={sheetData} />
		</div>
	);
};

export default DashboardPage;
