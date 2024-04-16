import { redirect } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { FinancesSheet } from '@/components/FinancesSheet';
import { FinancesMobileTable } from '@/components/FinancesMobileTable';

import { AddFinanceButton } from './_components/AddFinanceButton';
import { ExportXLSX } from './_components/ExportXLSX';

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
				take: 8,
				skip: 0,
			},
		},
	});

	if (!sheetData) {
		redirect('/dashboard');
	}

	return (
		<main className='flex-1'>
			<FinancesSheet sheetData={sheetData} />
			<FinancesMobileTable sheetData={sheetData} />
			<footer className='mx-auto w-[95%] flex items-center justify-start lg:justify-center pb-8'>
				<ExportXLSX sheetId={sheetData.id} />
			</footer>
			<AddFinanceButton sheetMonth={sheetData.name} />
		</main>
	);
};

export default SheetPage;
