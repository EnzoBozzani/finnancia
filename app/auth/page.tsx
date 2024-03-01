import { Metadata } from 'next';
import { SignIn } from './_components/SignIn';

export const metadata: Metadata = {
	title: 'Entrar',
};

const AuthPage = () => {
	return (
		<main className='flex-1 flex justify-center items-center'>
			<SignIn />
		</main>
	);
};

export default AuthPage;
