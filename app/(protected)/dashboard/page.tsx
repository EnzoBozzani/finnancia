import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { DashboardChart } from './_components/DashboardChart';
import { getSheetTimeSinceJanuary1970 } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Painel',
};

const DashboardPage = async () => {
	const user = await currentUser();

	const sheets = await db.sheet.findMany({
		where: { userId: user.id },
		include: {
			finances: { select: { type: true, amount: true } },
		},
	});

	const lastSixSheets = sheets
		.filter((sheet) => getSheetTimeSinceJanuary1970(sheet) < new Date().valueOf())
		.sort((sheetA, sheetB) => getSheetTimeSinceJanuary1970(sheetA) - getSheetTimeSinceJanuary1970(sheetB))
		.slice(-6);

	return (
		<main className='flex-1'>
			<section className='w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4'>
				<div>
					<DashboardChart sheets={lastSixSheets} />
				</div>
				<div>
					<DashboardChart sheets={lastSixSheets} />
				</div>
				<div>
					<DashboardChart sheets={lastSixSheets} />
				</div>
				<div>
					<DashboardChart sheets={lastSixSheets} />
				</div>
			</section>
		</main>
	);
};

export default DashboardPage;
