import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

const DAY_IN_MS = 86_400_000;

export async function GET() {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ hasActiveSubscription: false }, { status: 200 });
	}

	try {
		const data = await db.userSubscription.findFirst({
			where: { userId: user.id },
		});

		if (!data) {
			return NextResponse.json({ hasActiveSubscription: false }, { status: 200 });
		}

		const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

		return NextResponse.json({ hasActiveSubscription: !!isActive }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado!',
			},
			{ status: 500 }
		);
	}
}

// export const getUserSubscription = cache(async () => {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return null;
// 	}

// 	const data = await db.query.userSubscription.findFirst({
// 		where: eq(userSubscription.userId, userId),
// 	});

// 	if (!data) {
// 		return null;
// 	}

// 	const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

// 	return {
// 		...data,
// 		isActive: !!isActive,
// 	};
// });
