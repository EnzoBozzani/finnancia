import { Metadata } from 'next';

import { ThemeSwitcher } from './_components/ThemeSwitcher';
import { ExportCSV } from './_components/ExportCSV';
import { ProCard } from './_components/ProCard';
import { getUserSubscription } from '@/lib/stripe';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Configurações',
};

const SettingsPage = async () => {
	const user = await currentUser();

	if (!user) {
		redirect('/auth');
	}

	const userSubscription = await getUserSubscription(user.id);

	return (
		<main className='flex-1 space-y-6'>
			<ThemeSwitcher />
			<ExportCSV />
			<ProCard hasActiveSubscription={!!userSubscription?.isActive} />
		</main>
	);
};

export default SettingsPage;
