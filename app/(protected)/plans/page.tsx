import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { getUserSubscription } from '@/lib/stripe';
import { ActivePlan } from './_components/ActivePlan';

export const metadata: Metadata = {
	title: 'Planos',
};

const PlansPage = async () => {
	const user = await currentUser();

	if (!user) {
		redirect('/auth');
	}

	const userSubscription = await getUserSubscription(user.id);

	return (
		<main className='flex-1 max-w-screen-xl mx-auto text-white'>
			<ActivePlan hasActiveSubscription={!!userSubscription?.isActive} />
		</main>
	);
};

export default PlansPage;
