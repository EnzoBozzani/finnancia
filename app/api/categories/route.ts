import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { CreateCategorySchema } from '@/schemas/CreateCategorySchema';
import { getUserSubscription } from '@/lib/stripe';
import { MAX_CATEGORIES_FOR_FREE } from '@/constants/subscription';
import { Category } from '@prisma/client';

export async function POST(req: NextRequest) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Não autorizado!',
			},
			{ status: 401 }
		);
	}

	const body = await req.json();

	const validatedFields = CreateCategorySchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

	const { name, color } = validatedFields.data;

	try {
		const userSubscription = await getUserSubscription(user.id);

		const categoriesCount = await db.category.count({ where: { userId: user.id } });

		if (categoriesCount >= MAX_CATEGORIES_FOR_FREE && !userSubscription?.isActive) {
			return NextResponse.json(
				{
					message: 'Você atingiu o limite de 5 categorias!',
					maxFreeCategoriesReached: true,
				},
				{ status: 200 }
			);
		}

		let existingCategory: Category | null = null;

		if (color !== 'transparent') {
			existingCategory = await db.category.findFirst({
				where: {
					OR: [{ name }, { color }],
					userId: user.id,
				},
			});
		}

		if (existingCategory) {
			return NextResponse.json(
				{
					error: `Categoria ${existingCategory.name} já existe!`,
				},
				{ status: 400 }
			);
		}

		await db.category.create({
			data: {
				color: color || null,
				name,
				userId: user.id,
			},
		});

		return NextResponse.json(
			{
				success: 'Categoria criada com sucesso!',
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
		const categories = await db.category.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				name: 'asc',
			},
		});

		return NextResponse.json(categories, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
