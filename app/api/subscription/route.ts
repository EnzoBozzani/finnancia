import { NextResponse } from 'next/server';

import { currentUser } from '@/lib/auth';
import { getUserSubscription, stripe } from '@/lib/stripe';
import { AMOUNT } from '@/constants/subscription';

const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings`;

export async function GET() {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
	}

	try {
		const userSubscription = await getUserSubscription(user.id);

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: returnUrl,
			});

			return NextResponse.json({ url: stripeSession.url });
		}

		const stripeSession = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			customer_email: user.email!,
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: 'BRL',
						product_data: {
							name: 'Finnancia Pro',
							description: 'Tenha acesso à todo o potencial do Finnancia!',
						},
						unit_amount: AMOUNT,
						recurring: {
							interval: 'month',
						},
					},
				},
			],
			metadata: {
				userId: user.id,
			},
			success_url: returnUrl,
			cancel_url: returnUrl,
		});

		return NextResponse.json({ url: stripeSession.url });
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Algo deu errado',
			},
			{ status: 500 }
		);
	}
}
