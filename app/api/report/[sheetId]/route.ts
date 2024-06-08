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

		// if (dbUser.hasUsedFreeReport && !userSubscription?.isActive) {
		// 	return NextResponse.json(
		// 		{
		// 			message: 'Você já usou seu relatório gratuito!',
		// 			freeReportUsed: true,
		// 		},
		// 		{ status: 200 }
		// 	);
		// }

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

		return NextResponse.json(
			{
				sheet,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
