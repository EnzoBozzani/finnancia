import { Metadata } from 'next';
import { ThemeSwitcher } from './_components/ThemeSwitcher';

export const metadata: Metadata = {
	title: 'Configurações',
};

const SettingsPage = () => {
	return (
		<main className='flex-1'>
			<ThemeSwitcher />
			<div>TODO: BAGULHO DAS ASSINATURAS E ETC</div>
		</main>
	);
};

export default SettingsPage;
