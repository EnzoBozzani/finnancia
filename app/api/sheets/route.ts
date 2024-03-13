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
				order: true,
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
		const existingSheet = await db.sheet.findFirst({
			where: {
				name: `${months[month - 1]}/${year}`,
				userId: user.id,
			},
		});

		if (existingSheet) {
			return NextResponse.json(
				{
					error: 'Já existe uma planilha para esse mês!',
				},
				{ status: 400 }
			);
		}

		const newSheet = await db.sheet.create({
			data: {
				name: `${months[month - 1]}/${year}`,
				totalAmount: 0,
				userId: user.id!,
				order: month,
			},
		});

		return NextResponse.json(
			{
				success: 'Succesfully created!',
				sheetId: newSheet.id,
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
