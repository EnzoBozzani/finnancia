import { NextRequest, NextResponse } from 'next/server';

import { Color } from '@/constants/colors';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { EditCategorySchema } from '@/schemas/EditCategorySchema';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();

	const validatedFields = EditCategorySchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

	const { color, name } = validatedFields.data;

	if (!color && !name) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

	const valuesToUpdate: {
		color?: Color;
		name?: string;
	} = {};

	if (color) valuesToUpdate['color'] = color;
	if (name) valuesToUpdate['name'] = name;

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
		const categoryToBeEdited = await db.category.findUnique({ where: { id: params.id } });

		if (!categoryToBeEdited) {
			return NextResponse.json(
				{
					error: 'Categoria não encontrada!',
				},
				{ status: 404 }
			);
		}
		await db.category.update({
			where: { id: params.id, userId: user.id },
			data: {
				...valuesToUpdate,
			},
		});

		return NextResponse.json(
			{
				success: 'Categoria editada com sucesso!',
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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
		const categoryToBeDeleted = await db.category.findUnique({ where: { id: params.id, userId: user.id } });

		if (!categoryToBeDeleted) {
			return NextResponse.json(
				{
					error: 'Categoria não encontrada!',
				},
				{ status: 404 }
			);
		}

		await db.category.delete({
			where: { id: params.id, userId: user.id },
		});

		return NextResponse.json(
			{
				success: 'Categoria deletada com sucesso!',
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
