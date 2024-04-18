import { currentUser } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Painel',
};

const AIPage = async () => {
	const user = await currentUser();

	return (
		<main className='flex-1'>
			<h1 className='text-green-600  font-bold text-4xl ps-12'>Bem vindo, {user.name?.split(' ')[0]}!</h1>
		</main>
	);
};

export default AIPage;
