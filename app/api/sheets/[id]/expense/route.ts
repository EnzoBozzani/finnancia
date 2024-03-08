import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	try {
		await db.expense.create({
			data: {
				amount: body.amount,
				title: body.title,
				sheetId: params.id,
				date: body.date,
			},
		});

		return NextResponse.json(
			{
				success: 'Expense created!',
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
