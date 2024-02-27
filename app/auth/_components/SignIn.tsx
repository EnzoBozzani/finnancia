'use client';

import { Social } from './Social';

export const SignIn = () => {
	return (
		<section className='w-[95%] sm:w-[500px] py-12 bg-white rounded-xl shadow-lg'>
			<h1 className='text-2xl text-center'>LOGO</h1>
			<p className='text-sm text-neutral-500 text-center'>Sign in to continue to Financia</p>
			<Social />
		</section>
	);
};
