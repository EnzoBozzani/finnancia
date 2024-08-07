import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { CreateFinanceSchema } from '@/schemas/CreateFinanceSchema';
import { currentUser } from '@/lib/auth';
import { getUserTotalAmount } from '@/data/user';
import { getUserSubscription } from '@/lib/stripe';
import { MAX_FINANCES_FOR_FREE } from '@/constants/subscription';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Não autorizado!',
			},
			{ status: 401 }
		);
	}

	const result = CreateFinanceSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

	const { amount, date, title, type, categoryId } = result.data;

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

		const userSubscription = await getUserSubscription(user.id);

		if (!userSubscription?.isActive && sheet.financesCount >= MAX_FINANCES_FOR_FREE) {
			return NextResponse.json(
				{
					error: 'Limite de finanças atingido!',
				},
				{ status: 400 }
			);
		}

		const userTotalAmount = await getUserTotalAmount(user.id);

		if (!userTotalAmount?.isInitialAmountSet) {
			return NextResponse.json(
				{
					error: 'Não autorizado!',
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
				categoryId: categoryId ? categoryId : null,
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
				totalAmount:
					type === 'PROFIT' ? userTotalAmount.totalAmount + amount : userTotalAmount.totalAmount - amount,
			},
		});

		revalidatePath('dashboard', 'layout');
		revalidatePath(`dashboard/${params.id}`, 'page');

		return NextResponse.json(
			{
				success: 'Finança criada!',
			},
			{ status: 200 }
		);
	} catch (error) {
		await db.error.create({
			data: {
				userId: user.id,
				message: error?.toString() || 'Nao foi possivel converter o tipo do erro pra string',
			},
		});
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
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
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

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
		const sheet = await db.sheet.findUnique({
			where: { id: params.id, userId: user.id },
			select: { id: true, financesCount: true },
		});

		if (!sheet) {
			return NextResponse.json(
				{
					error: 'Planilha não encontrada!',
				},
				{ status: 404 }
			);
		}

		const financesCount = await db.finance.count({
			where: {
				sheetId: sheet.id,
				OR: [
					{ title: { contains: title || '', mode: 'insensitive' } },
					{ category: { name: { contains: title || '', mode: 'insensitive' } } },
				],
			},
		});

		let financesAmount = 0;
		if (title) {
			const filteredFinancesProfitAmount = await db.finance.aggregate({
				where: {
					sheetId: sheet.id,
					OR: [
						{ title: { contains: title || '', mode: 'insensitive' } },
						{ category: { name: { contains: title || '', mode: 'insensitive' } } },
					],
					type: 'PROFIT',
				},
				_sum: {
					amount: true,
				},
			});
			const filteredFinancesExpenseAmount = await db.finance.aggregate({
				where: {
					sheetId: sheet.id,
					OR: [
						{ title: { contains: title || '', mode: 'insensitive' } },
						{ category: { name: { contains: title || '', mode: 'insensitive' } } },
					],
					type: 'EXPENSE',
				},
				_sum: {
					amount: true,
				},
			});

			financesAmount +=
				(filteredFinancesProfitAmount._sum.amount || 0) - (filteredFinancesExpenseAmount._sum.amount || 0);
		}

		const finances = await db.finance.findMany({
			where: {
				sheetId: sheet.id,
				OR: [
					{ title: { contains: title || '', mode: 'insensitive' } },
					{ category: { name: { contains: title || '', mode: 'insensitive' } } },
				],
			},
			take: 8,
			skip: Number(page) * 8,
			include: {
				category: true,
			},
			orderBy: [
				{
					order: 'desc',
				},
				{
					createdAt: 'desc',
				},
			],
		});

		return NextResponse.json({
			finances,
			financesCount,
			sheetId: sheet.id,
			financesAmount,
		});
	} catch (error) {
		await db.error.create({
			data: {
				userId: user.id,
				message: error?.toString() || 'Nao foi possivel converter o tipo do erro pra string',
			},
		});
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
