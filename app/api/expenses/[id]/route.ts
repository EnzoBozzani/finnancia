import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized!',
			},
			{ status: 401 }
		);
	}

	try {
		const expenseToBeDeleted = await db.expense.findUnique({
			where: { id: params.id },
			select: { sheetId: true, amount: true },
		});

		if (!expenseToBeDeleted) {
			return NextResponse.json(
				{
					error: 'Not found!',
				},
				{ status: 404 }
			);
		}

		const sheet = await db.sheet.findUnique({
			where: { id: expenseToBeDeleted?.sheetId, userId: user.id },
			select: { id: true, totalAmount: true },
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Not found!',
				},
				{ status: 404 }
			);
		}

		await db.expense.delete({
			where: { id: params.id, sheetId: sheet.id },
		});

		await db.sheet.update({
			where: { id: expenseToBeDeleted?.sheetId, userId: user.id },
			data: { totalAmount: sheet.totalAmount - expenseToBeDeleted.amount },
		});

		return NextResponse.json({ success: 'Deletado com sucesso!' }, { status: 204 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
