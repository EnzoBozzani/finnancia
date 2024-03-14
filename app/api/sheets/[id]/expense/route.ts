import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CreateExpenseSchema } from '@/schemas/CreateExpenseSchema';
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

	const result = CreateExpenseSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				error: 'Valores inválidos!',
			},
			{ status: 400 }
		);
	}

	const { amount, date, title } = result.data;

	const order = Number(date.slice(0, 2));

	try {
		const sheet = await db.sheet.findUnique({
			where: { id: params.id, userId: user.id },
			select: {
				totalAmount: true,
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

		await db.expense.create({
			data: {
				amount: amount,
				title: title,
				sheetId: params.id,
				date: date,
				order,
			},
		});

		await db.sheet.update({
			where: { id: params.id },
			data: {
				totalAmount: sheet.totalAmount + amount,
			},
		});

		return NextResponse.json(
			{
				success: 'Expense created!',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				error: 'Something went wrong!',
			},
			{ status: 500 }
		);
	}
}
