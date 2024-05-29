import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
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
		const categories = await db.category.findMany({
			where: { userId: user.id },
		});

		const colors = categories.map((category) => category.color);

		return NextResponse.json({ colors }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
