import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { sheetId: string } }) {
	const { sheetId } = params;

	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Não autorizado',
			},
			{ status: 401 }
		);
	}

	try {
		const finances = await db.finance.findMany({
			where: { sheetId, sheet: { userId: user.id } },
			include: {
				category: true,
			},
		});

		return NextResponse.json({ finances }, { status: 200 });
	} catch (error) {
		await db.error.create({
			data: {
				userId: user.id,
				message: error?.toString() || 'Nao foi possivel converter o tipo do erro pra string',
			},
		});
		return NextResponse.json(
			{
				error: 'Algo deu errado',
			},
			{ status: 500 }
		);
	}
}
