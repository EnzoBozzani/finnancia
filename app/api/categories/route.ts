import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { CreateCategorySchema } from '@/schemas/CreateCategorySchema';

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
		const existingCategory = await db.category.findFirst({
			where: {
				name,
				userId: user.id,
			},
		});

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
		console.error(error);
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
