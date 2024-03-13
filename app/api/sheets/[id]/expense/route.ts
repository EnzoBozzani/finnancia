import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	const order = Number(body.date.slice(0, 2));

	try {
		await db.expense.create({
			data: {
				amount: body.amount,
				title: body.title,
				sheetId: params.id,
				date: body.date,
				order,
			},
		});

		const sheet = await db.sheet.findUnique({
			where: { id: params.id },
			select: {
				totalAmount: true,
			},
		});

		await db.sheet.update({
			where: { id: params.id },
			data: {
				totalAmount: sheet?.totalAmount + body.amount,
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
