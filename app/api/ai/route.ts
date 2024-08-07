import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { AIPromptSchema } from '@/schemas/AIPromptSchema';
import { chatWithAI } from '@/lib/ai';
import { db } from '@/lib/db';
import { MAX_PROMPTS_FOR_FREE } from '@/constants/subscription';
import { getUserSubscription } from '@/lib/stripe';

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

	const validatedField = AIPromptSchema.safeParse(body);

	if (!validatedField.success) {
		return NextResponse.json(
			{
				error: 'Campo(s) inválido(s)!',
			},
			{ status: 400 }
		);
	}

	const { prompt } = validatedField.data;

	try {
		const userSubscription = await getUserSubscription(user.id);

		const oldMessages = await db.message.findMany({ where: { userId: user.id } });

		const numberOfUserMessages = oldMessages.filter((message) => message.role === 'USER').length;

		if (numberOfUserMessages >= MAX_PROMPTS_FOR_FREE && !userSubscription?.isActive) {
			return NextResponse.json({
				maxPromptsReached: true,
			});
		}

		const response = await chatWithAI(prompt, oldMessages, user.name!);

		const userMessage = await db.message.create({
			data: {
				body: prompt,
				role: 'USER',
				userId: user.id,
			},
		});

		const modelMessage = await db.message.create({
			data: {
				body: response,
				role: 'MODEL',
				userId: user.id,
			},
		});

		return NextResponse.json(
			{
				userMessage,
				modelMessage,
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
