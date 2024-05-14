import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { months } from '@/constants/months';
import { CreateSheetSchema } from '@/schemas/CreateSheetSchema';

export async function GET(req: NextRequest) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Não autorizado!',
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

		const dbUser = await db.user.findUnique({
			where: { id: user.id },
			select: {
				isInitialAmountSet: true,
			},
		});

		return NextResponse.json({ sheets, isInitialAmountSet: dbUser?.isInitialAmountSet }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	const body = await req.json();

	const result = CreateSheetSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

	const { month, year } = result.data;
	const currentDate = new Date();

	if (year < currentDate.getFullYear() - 5 || year > currentDate.getFullYear() + 1 || month < 1 || month > 12) {
		return NextResponse.json({ error: 'Campo(s) inválido(s)!' }, { status: 400 });
	}

	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
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
				success: 'Planilha criada com sucesso!',
				sheetId: newSheet.id,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
