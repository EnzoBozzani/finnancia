import { Metadata } from 'next';
import { SignIn } from './_components/SignIn';

export const metadata: Metadata = {
	title: 'Entrar',
};

const AuthPage = () => {
	return (
		<main className='flex-1 min-h-screen bg-neutral-100 flex justify-center items-center'>
			<SignIn />
		</main>
	);
};

export default AuthPage;
