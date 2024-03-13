import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { months } from '@/constants/months';

export async function GET(req: NextRequest) {
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
		const sheets = await db.sheet.findMany({
			where: {
				userId: user?.id,
			},
			select: {
				name: true,
				id: true,
			},
		});

		return NextResponse.json(sheets, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Something went wrong!',
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	const { month, year } = await req.json();

	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
	}

	try {
		const newSheet = await db.sheet.create({
			data: {
				name: `${months[month - 1]}/${year}`,
				totalAmount: 0,
				userId: user.id!,
				order: year,
			},
		});

		return NextResponse.json(
			{
				success: 'Succesfully created!',
				sheetId: newSheet.id,
			},
			{ status: 204 }
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
