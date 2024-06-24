import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { ChangeAmountSchema } from '@/schemas/ChangeAmountSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();

	const validatedFields = ChangeAmountSchema.safeParse(body);

	if (!validatedFields.success) {
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
				error: 'Não autorizado',
			},
			{ status: 401 }
		);
	}

	const { amount } = validatedFields.data;

	try {
		await db.user.update({
			where: { id: user.id },
			data: {
				totalAmount: amount,
			},
		});

		return NextResponse.json({ success: 'Saldo alterado com sucesso!' }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
