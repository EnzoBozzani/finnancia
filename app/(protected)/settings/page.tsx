import { Metadata } from 'next';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';

import { ThemeSwitcher } from './_components/ThemeSwitcher';
import { ExportCSV } from './_components/ExportCSV';
import { AIReportSwitch } from './_components/AIReportSwitch';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Configurações',
};

const SettingsPage = async () => {
	const user = await currentUser();

	const dbUser = await db.user.findUnique({
		where: { id: user.id },
		select: { includeAIAnalysis: true },
	});

	if (!dbUser) {
		redirect('/auth');
	}

	return (
		<main className='flex-1 space-y-6'>
			<ThemeSwitcher />
			<ExportCSV />
			<AIReportSwitch includeAIAnalysis={dbUser.includeAIAnalysis} />
			<div>TODO: BAGULHO DAS ASSINATURAS E ETC</div>
		</main>
	);
};

export default SettingsPage;
