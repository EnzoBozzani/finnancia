import { FormGroup } from '@/components/FormGroup';
import { Button } from '@/components/ui/button';
import { Social } from './Social';
import Link from 'next/link';

export const LoginForm = () => {
	const onSubmit = async (formData: FormData) => {
		'use server';
	};

	return (
		<section className='w-[95%] sm:w-[500px] py-12 mt-12 mb-24 bg-white rounded-xl shadow-lg'>
			<h1 className='text-2xl text-center'>LOGO</h1>
			<p className='text-sm text-neutral-500 text-center'>Welcome back!</p>
			<form
				action={onSubmit}
				className='flex flex-col items-center gap-y-8 px-8 sm:px-20 mt-12'
			>
				<FormGroup
					id='user'
					label='User'
					className='w-[90%] sm:w-[370px]'
				/>
				<FormGroup
					id='password'
					label='Password'
					className='w-[90%] sm:w-[370px]'
				/>
				<Button className='w-[90%] sm:w-[370px] text-base'>Login</Button>
			</form>
			<Social />
			<div className='flex justify-center items-center mt-12'>
				<Link
					className='text-sm hover:underline'
					href={'/auth/register'}
				>
					Don't have an account?
				</Link>
			</div>
		</section>
	);
};
