import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { SupportBox } from './_components/SupportBox';

export const metadata: Metadata = {
	title: 'Suporte',
};

const HelpPage = async () => {
	const user = await currentUser();

	return (
		<main className='flex-1 space-y-6'>
			<SupportBox />
		</main>
	);
};

export default HelpPage;
