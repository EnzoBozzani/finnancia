'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export const Social = () => {
	return (
		<div className='mx-auto flex items-center flex-col gap-y-2 mt-12 px-2'>
			<Button
				size={'lg'}
				className='w-[100%] sm:w-[370px] py-6'
				variant={'outline'}
				onClick={() => {
					signIn('google', {
						callbackUrl: DEFAULT_LOGIN_REDIRECT,
					});
				}}
			>
				<FcGoogle className='w-7 h-7 mr-4' />
				Continue with Google
			</Button>
		</div>
	);
};
