import { currentUser } from '@/lib/auth';
import { Metadata } from 'next';
import { AIChat } from './_components/AIChat';

export const metadata: Metadata = {
	title: 'Painel',
};

const AIPage = async () => {
	const user = await currentUser();

	return (
		<main className='flex-1'>
			<AIChat user={user} />{' '}
		</main>
	);
};

export default AIPage;
