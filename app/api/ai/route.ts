import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { AIPromptSchema } from '@/schemas/AIPromptSchema';
import { chatWithAI } from '@/lib/ai';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{
				error: 'Unauthorized!',
			},
			{ status: 401 }
		);
	}

	const body = await req.json();

	const validatedField = AIPromptSchema.safeParse(body);

	if (!validatedField.success) {
		return NextResponse.json(
			{
				error: 'Invalid field!',
			},
			{ status: 400 }
		);
	}

	const { prompt } = validatedField.data;

	try {
		const oldMessages = await db.message.findMany({ where: { userId: user.id } });

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
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
