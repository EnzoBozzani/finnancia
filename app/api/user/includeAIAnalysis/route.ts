import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { includeAIAnalysis } from '@/schemas/IncludeAIAnalysis';

export async function POST(req: NextRequest) {
	const body = await req.json();

	const validatedFields = includeAIAnalysis.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json({ error: 'Campo(s) inválido(s)!' }, { status: 400 });
	}

	const { currentStatus } = validatedFields.data;

	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
	}

	try {
		await db.user.update({
			where: { id: user.id },
			data: { includeAIAnalysis: !currentStatus },
		});

		return NextResponse.json({ success: 'Configuração atualizada com sucesso!' }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}
