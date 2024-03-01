import { Logo } from '@/components/Logo';
import { Social } from './Social';

export const SignIn = () => {
	return (
		<section className='w-[95%] sm:w-[500px] pb-12 pt-4 bg-white rounded-xl shadow-lg'>
			<Logo className='mx-auto w-fit' />
			<p className='text-sm text-neutral-500 text-center my-6'>Entre para continuar no Finnancia</p>
			<Social />
		</section>
	);
};
