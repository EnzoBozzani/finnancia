import { db } from '@/lib/db';

export async function getUserByEmail(email: string) {
	try {
		const user = await db.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch (error) {
		return null;
	}
}

export async function getUserById(id: string) {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		return null;
	}
}

export async function getUserTotalAmount(id: string) {
	try {
		const dbUser = await db.user.findUnique({
			where: { id },
			select: { isInitialAmountSet: true, totalAmount: true },
		});

		if (!dbUser) return null;

		return dbUser;
	} catch (error) {
		return null;
	}
}
