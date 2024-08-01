import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserSubscription } from '@/lib/stripe';

export async function GET(req: NextRequest, { params }: { params: { sheetId: string } }) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Não autorizado!',
			},
			{ status: 401 }
		);
	}

	const { sheetId } = params;

	try {
		const userSubscription = await getUserSubscription(user.id);

		const dbUser = await db.user.findUnique({
			where: { id: user.id },
			select: { hasUsedFreeReport: true },
		});

		if (!dbUser) {
			return NextResponse.json(
				{
					error: 'Não autorizado!',
				},
				{ status: 401 }
			);
		}

		if (dbUser.hasUsedFreeReport && !userSubscription?.isActive) {
			return NextResponse.json(
				{
					message: 'Você já usou seu relatório gratuito!',
					freeReportUsed: true,
				},
				{ status: 200 }
			);
		}

		if (!userSubscription?.isActive) {
			await db.user.update({
				where: { id: user.id },
				data: {
					hasUsedFreeReport: true,
				},
			});
		}

		const sheet = await db.sheet.findUnique({
			where: { id: sheetId, userId: user.id },
			include: {
				finances: {
					orderBy: {
						order: 'asc',
					},
					include: {
						category: true,
					},
				},
			},
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Planilha não encontrada!',
				},
				{ status: 404 }
			);
		}

		if (sheet.finances.length === 0) {
			return NextResponse.json(
				{
					error: 'Não é possível exportar uma planilha vazia!',
				},
				{ status: 200 }
			);
		}

		const sheets = await db.sheet.findMany({
			where: { userId: user.id },
			include: {
				finances: {
					select: {
						amount: true,
						type: true,
					},
				},
			},
		});

		const numberOfSheets = sheets.length;

		let totalExpense = 0;
		let totalProfit = 0;
		let totalAmount = 0;

		sheets.forEach((currentSheet) => {
			totalAmount += currentSheet.totalAmount;

			currentSheet.finances.forEach((finance) => {
				if (finance.type === 'EXPENSE') {
					totalExpense += finance.amount;
				} else {
					totalProfit += finance.amount;
				}
			});
		});

		const mediumAmount = totalAmount / (numberOfSheets || 1);
		const mediumProfit = totalProfit / (numberOfSheets || 1);
		const mediumExpense = totalExpense / (numberOfSheets || 1);

		return NextResponse.json(
			{
				sheet,
				mediumAmount,
				mediumProfit,
				mediumExpense,
			},
			{ status: 200 }
		);
	} catch (error) {
		await db.error.create({
			data: {
				userId: user.id,
				message: error?.toString() || 'Nao foi possivel converter o tipo do erro pra string',
			},
		});
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
