import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { HelpMessageSchema } from '@/schemas/HelpMessageSchema';

export async function POST(req: NextRequest) {
	const body = await req.json();

	const validatedFields = HelpMessageSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)',
			},
			{ status: 400 }
		);
	}

	const { message } = validatedFields.data;

	const user = await currentUser();

	if (!user || !user.email) {
		return NextResponse.json(
			{
				error: 'Não autorizado',
			},
			{ status: 401 }
		);
	}

	try {
		const lastMessage = await db.helpMessage.findFirst({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		if (lastMessage && lastMessage.createdAt.getTime() + 1000 * 60 * 60 * 24 > Date.now()) {
			return NextResponse.json(
				{
					message: 'Você só pode enviar uma mensagem a cada 24 horas',
					timeLimit: true,
				},
				{ status: 200 }
			);
		}

		await db.helpMessage.create({
			data: {
				body: message,
				userEmail: user.email,
				userId: user.id,
			},
		});

		return NextResponse.json(
			{
				success: 'Mensagem enviada com sucesso!',
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado',
			},
			{ status: 500 }
		);
	}
}
