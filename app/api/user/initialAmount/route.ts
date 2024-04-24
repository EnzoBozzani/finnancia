import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SetInitialAmountSchema } from '@/schemas/SetInitialAmountSchema';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized!',
			},
			{ status: 401 }
		);
	}

	const validatedFields = SetInitialAmountSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				error: 'Invalid data!',
			},
			{ status: 400 }
		);
	}

	const { amount } = validatedFields.data;

	try {
		await db.user.update({
			where: { id: user.id },
			data: { isInitialAmountSet: true, totalAmount: amount },
		});

		return NextResponse.json(
			{
				success: 'Set with success',
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
