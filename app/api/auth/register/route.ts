import { RegisterSchema } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const validatedFields = RegisterSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				error: validatedFields.error.errors[0].message,
			},
			{ status: 400 }
		);
	}

	const { email, password, name } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return NextResponse.json(
			{
				error: 'Email already in use!',
			},
			{ status: 400 }
		);
	}

	await db.user.create({ data: { name, email, password: hashedPassword } });

	return NextResponse.json({
		success: 'User created!',
	});

	//implementar verificação de email
}
