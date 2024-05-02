import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { CreateFinanceSchema } from '@/schemas/CreateFinanceSchema';
import { currentUser } from '@/lib/auth';
import { getUserTotalAmount } from '@/data/user';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized',
			},
			{ status: 401 }
		);
	}

	const result = CreateFinanceSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				error: 'Valores inválidos!',
			},
			{ status: 400 }
		);
	}

	const { amount, date, title, type } = result.data;

	const order = Number(date.slice(0, 2));

	try {
		const sheet = await db.sheet.findUnique({
			where: { id: params.id, userId: user.id },
			select: {
				totalAmount: true,
				financesCount: true,
			},
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Planilha não encontrada!',
				},
				{ status: 404 }
			);
		}

		const userTotalAmount = await getUserTotalAmount(user.id);

		if (!userTotalAmount) {
			return NextResponse.json(
				{
					error: 'Usuário não encontrado!',
				},
				{ status: 404 }
			);
		}

		await db.finance.create({
			data: {
				amount: amount,
				title: title,
				sheetId: params.id,
				date: date,
				order,
				type,
			},
		});

		await db.sheet.update({
			where: { id: params.id },
			data: {
				totalAmount: type === 'PROFIT' ? sheet.totalAmount + amount : sheet.totalAmount - amount,
				financesCount: sheet.financesCount + 1,
			},
		});

		await db.user.update({
			where: { id: user.id },
			data: {
				totalAmount: type === 'PROFIT' ? userTotalAmount + amount : userTotalAmount - amount,
			},
		});

		revalidatePath('dashboard', 'layout');

		return NextResponse.json(
			{
				success: 'Finança criada!',
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
	const title = searchParams.get('title');

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
			select: { id: true, financesCount: true },
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Sheet not found!',
				},
				{ status: 404 }
			);
		}

		const financesCount = await db.finance.count({
			where: { sheetId: sheet.id, title: { contains: title || '', mode: 'insensitive' } },
		});

		let financesAmount = 0;
		if (title) {
			const filteredFinancesProfitAmount = await db.finance.aggregate({
				where: { sheetId: sheet.id, title: { contains: title || '', mode: 'insensitive' }, type: 'PROFIT' },
				_sum: {
					amount: true,
				},
			});
			const filteredFinancesExpenseAmount = await db.finance.aggregate({
				where: { sheetId: sheet.id, title: { contains: title || '', mode: 'insensitive' }, type: 'EXPENSE' },
				_sum: {
					amount: true,
				},
			});

			financesAmount +=
				(filteredFinancesProfitAmount._sum.amount || 0) - (filteredFinancesExpenseAmount._sum.amount || 0);
		}

		const finances = await db.finance.findMany({
			where: { sheetId: sheet.id, title: { contains: title || '', mode: 'insensitive' } },
			take: 8,
			skip: Number(page) * 8,
			orderBy: {
				order: 'desc',
			},
		});

		return NextResponse.json({
			finances,
			financesCount,
			sheetId: sheet.id,
			financesAmount,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Something went wrong!',
			},
			{ status: 500 }
		);
	}
}
