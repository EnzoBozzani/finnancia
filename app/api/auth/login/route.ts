import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { signIn } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export async function POST(req: NextRequest, res: NextResponse) {
	const validatedFiels = LoginSchema.safeParse(req.body);

	if (!validatedFiels.success) {
		return NextResponse.json(
			{
				error: 'Invalid fields!',
			},
			{ status: 400 }
		);
	}

	const { email, password, code } = validatedFiels.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return NextResponse.json(
			{
				error: 'Email does not exist!',
			},
			{ status: 404 }
		);
	}

	if (!existingUser.emailVerified) {
		//implementar verificação de email
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		//implementar 2FA
	}

	try {
		await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid Credentials!' };
				default:
					return { error: 'Something went wrong!' };
			}
		}

		throw error;
	}
}
