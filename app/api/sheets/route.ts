import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const user = await currentUser();

	try {
		const sheets = await db.sheet.findMany({
			where: {
				userId: user?.id,
			},
			select: {
				name: true,
			},
		});

		return NextResponse.json({ sheets }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Something went wrong!',
			},
			{ status: 500 }
		);
	}
}
