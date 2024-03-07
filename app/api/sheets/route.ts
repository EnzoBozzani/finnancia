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
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
	}

	const months = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];

	const now = new Date();

	try {
		await db.sheet.create({
			data: {
				name: `${months[now.getMonth()]}/${now.getFullYear()}`,
				totalAmount: 0,
				userId: user.id!,
			},
		});

		return NextResponse.json(
			{
				success: 'Succesfully created!',
			},
			{ status: 204 }
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
