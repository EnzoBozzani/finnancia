import { Metadata } from 'next';
import { LoginForm } from '../_components/LoginForm';

export const metadata: Metadata = {
	title: 'Login',
};

const LoginPage = () => {
	return (
		<main className='flex-1 flex justify-center items-center'>
			<LoginForm />
		</main>
	);
};

export default LoginPage;
