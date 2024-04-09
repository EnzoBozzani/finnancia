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
		const sheet = await db.sheet.delete({
			where: { id: params.id, userId: user.id },
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Sheet not found!',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: `Planilha ${sheet.name} deletada com sucesso!`,
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const searchParams = req.nextUrl.searchParams;
	const page = searchParams.get('page');

	if (!page || isNaN(Number(page))) {
		return NextResponse.json(
			{
				error: 'Bad request!',
			},
			{ status: 400 }
		);
	}

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
		const sheet = await db.sheet.findUnique({
			where: { id: params.id, userId: user.id },
			include: {
				finances: {
					orderBy: {
						order: 'asc',
					},
					take: 8,
					skip: Number(page) * 8,
				},
			},
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Sheet not found!',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				sheet,
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
