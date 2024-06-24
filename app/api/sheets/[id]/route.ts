import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserTotalAmount } from '@/data/user';

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
		const sheet = await db.sheet.delete({
			where: { id: params.id, userId: user.id },
		});

		const userTotalAmount = await getUserTotalAmount(user.id);

		if (!userTotalAmount?.isInitialAmountSet) {
			return NextResponse.json(
				{
					error: 'Não autorizado!',
				},
				{ status: 401 }
			);
		}

		await db.user.update({
			where: { id: user.id },
			data: {
				totalAmount: userTotalAmount.totalAmount - sheet.totalAmount,
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

		revalidatePath('/dashboard', 'layout');
		return NextResponse.json(
			{
				success: `Planilha ${sheet.name} deletada com sucesso!`,
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
			include: {
				finances: {
					orderBy: {
						order: 'asc',
					},
				},
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

		return NextResponse.json(
			{
				sheet,
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
