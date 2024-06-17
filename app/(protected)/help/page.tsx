import { Metadata } from 'next';

import { currentUser } from '@/lib/auth';
import { SupportBox } from './_components/SupportBox';
import { FAQSection } from './_components/FAQSection';

export const metadata: Metadata = {
	title: 'Suporte',
};

const HelpPage = async () => {
	const user = await currentUser();

	return (
		<main className='flex-1'>
			<SupportBox />
			<FAQSection />
		</main>
	);
};

export default HelpPage;
