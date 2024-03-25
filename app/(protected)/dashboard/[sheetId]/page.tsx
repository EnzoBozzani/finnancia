import { redirect } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { FinancesSheet } from '@/components/FinancesSheet';
import { FinancesMobileTable } from '@/components/FinancesMobileTable';

import { AddFinanceButton } from './_components/AddFinanceButton';

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
			finances: {
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
			<h1 className='font-semibold text-center my-6 sm:mt-0 md:mb-12 text-3xl text-green-600'>
				{sheetData.name}
			</h1>
			<FinancesSheet sheetData={sheetData} />
			<FinancesMobileTable sheetData={sheetData} />
			<AddFinanceButton sheetMonth={sheetData.name} />
		</main>
	);
};

export default SheetPage;
