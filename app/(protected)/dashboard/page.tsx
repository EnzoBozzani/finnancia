import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { DashboardChart } from './_components/DashboardChart';

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

	const pastSheets = sheets.filter(
		(sheet) => new Date(`${sheet.name.split('/')[1]}-${sheet.order}-01`).valueOf() < new Date().valueOf()
	);
	console.log(pastSheets);

	return (
		<main className='flex-1'>
			<section className='w-[95%] mx-auto grid grid-cols-1 gap-y-4'>
				<DashboardChart sheets={sheets} />
				<DashboardChart sheets={sheets} />
				<DashboardChart sheets={sheets} />
			</section>
		</main>
	);
};

export default DashboardPage;
