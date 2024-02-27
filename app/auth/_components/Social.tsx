'use client';

import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export const Social = () => {
	return (
		<div className='mx-auto px-8 sm:px-20 flex items-center justify-center mt-12'>
			<Button
				size={'lg'}
				className='w-[90%] sm:w-[370px]'
				variant={'outline'}
				onClick={() => {}}
			>
				<FcGoogle className='w-5 h-5' />
			</Button>
		</div>
	);
};
