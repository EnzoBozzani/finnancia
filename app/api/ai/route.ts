import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { AIPromptSchema } from '@/schemas/AIPromptSchema';
import { generateResponseFromPrompt } from '@/lib/ai';

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
		const response = await generateResponseFromPrompt(prompt);

		return NextResponse.json(
			{
				response,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({
			error: 'Algo deu errado!',
		});
	}
}
