import { currentUser } from '@/lib/auth';
import { Metadata } from 'next';
import { AIChat } from './_components/AIChat';
import { db } from '@/lib/db';

export const metadata: Metadata = {
	title: 'Nanci',
};

const AIPage = async () => {
	const user = await currentUser();

	const messages = await db.message.findMany({ where: { userId: user.id } });

	return (
		<main className='flex-1'>
			<AIChat
				user={user}
				oldMessages={messages}
			/>{' '}
		</main>
	);
};

export default AIPage;
