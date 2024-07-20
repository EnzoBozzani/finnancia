'use client';

import { User } from '@prisma/client';
import { toast } from 'sonner';

export const UserRow = ({ user }: { user: User }) => {
	const handleClick = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success('Copiado para área de transferência');
	};

	return (
		<div className='w-full flex justify-between items-center border-b p-6'>
			<div
				role='button'
				onClick={() => handleClick(user.email!)}
				className='w-1/2 text-center truncate hover:text-clip px-2'
			>
				{user.email}
			</div>
			<div className='w-1/2 text-center truncate hover:text-clip px-2'>{user.name}</div>
		</div>
	);
};
