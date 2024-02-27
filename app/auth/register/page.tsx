import { Metadata } from 'next';
import { RegisterForm } from '../_components/RegisterForm';

export const metadata: Metadata = {
	title: 'Register',
};

const RegisterPage = () => {
	return (
		<main className='flex-1 flex justify-center items-center'>
			<RegisterForm />
		</main>
	);
};

export default RegisterPage;
