import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateReportFromFinances } from '@/lib/ai';

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
		const dbUser = await db.user.findUnique({
			where: { id: user.id },
			select: { includeAIAnalysis: true },
		});

		if (!dbUser) {
			return NextResponse.json(
				{
					error: 'Não autorizado!',
				},
				{ status: 401 }
			);
		}

		const sheet = await db.sheet.findUnique({
			where: { id: sheetId, userId: user.id },
			include: {
				finances: {
					orderBy: {
						order: 'asc',
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

		if (!dbUser.includeAIAnalysis) {
			return NextResponse.json({
				report: null,
				sheet,
			});
		}

		const modelReport = await generateReportFromFinances(sheet.finances, sheet.totalAmount);

		return NextResponse.json(
			{
				report: modelReport,
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
