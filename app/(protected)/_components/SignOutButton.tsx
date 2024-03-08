'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export const SignOutButton = () => {
	return (
		<Button
			variant={'destructive'}
			size={'lg'}
			onClick={() => signOut()}
			className='mx-auto mt-12'
		>
			Sair
		</Button>
	);
};
