import Stripe from 'stripe';

import { currentUser } from './auth';
import { db } from './db';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2024-04-10',
	typescript: true,
});

const DAY_IN_MS = 86_400_000;

export const getUserSubscription = async (userId: string) => {
	try {
		const data = await db.userSubscription.findFirst({
			where: { userId: userId },
		});

		if (!data) {
			return null;
		}

		const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

		return { ...data, isActive: !!isActive };
	} catch (error) {
		return null;
	}
};
