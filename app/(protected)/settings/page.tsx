import { Metadata } from 'next';

import { ThemeSwitcher } from './_components/ThemeSwitcher';
import { ExportCSV } from './_components/ExportCSV';

export const metadata: Metadata = {
	title: 'Configurações',
};

const SettingsPage = () => {
	return (
		<main className='flex-1 space-y-6'>
			<ThemeSwitcher />
			<ExportCSV />
			<div>TODO: BAGULHO DAS ASSINATURAS E ETC</div>
		</main>
	);
};

export default SettingsPage;
