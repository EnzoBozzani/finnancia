import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CreateFinanceSchema } from '@/schemas/CreateFinanceSchema';
import { currentUser } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized',
			},
			{ status: 401 }
		);
	}

	const result = CreateFinanceSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				error: 'Valores inválidos!',
			},
			{ status: 400 }
		);
	}

	const { amount, date, title, type } = result.data;

	if (type !== 'EXPENSE' && type !== 'PROFIT') {
		return NextResponse.json(
			{
				error: 'Valores inválidos!',
			},
			{ status: 400 }
		);
	}

	const order = Number(date.slice(0, 2));

	try {
		const sheet = await db.sheet.findUnique({
			where: { id: params.id, userId: user.id },
			select: {
				totalAmount: true,
				financesCount: true,
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

		await db.finance.create({
			data: {
				amount: amount,
				title: title,
				sheetId: params.id,
				date: date,
				order,
				type,
			},
		});

		await db.sheet.update({
			where: { id: params.id },
			data: {
				totalAmount: type === 'PROFIT' ? sheet.totalAmount + amount : sheet.totalAmount - amount,
				financesCount: sheet.financesCount + 1,
			},
		});

		return NextResponse.json(
			{
				success: 'Finança criada!',
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Something went wrong!',
			},
			{ status: 500 }
		);
	}
}
