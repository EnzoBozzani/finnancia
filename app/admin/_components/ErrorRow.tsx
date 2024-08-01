'use client';

import { Error } from '@prisma/client';
import { toast } from 'sonner';

export const ErrorRow = ({ error }: { error: Error }) => {
	const handleClick = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success('Copiado para área de transferência');
	};

	return (
		<div className='w-full flex justify-between items-center border-b p-6'>
			<div
				role='button'
				onClick={() => handleClick(error.userId)}
				className='w-1/3 text-center truncate hover:text-clip px-2'
			>
				{error.userId}
			</div>
			<div
				role='button'
				onClick={() => handleClick(error.message)}
				className='w-1/3 text-center truncate hover:text-clip px-2'
			>
				{error.message}
			</div>
			<div className='w-1/3 text-center truncate hover:text-clip px-2'>{error.createdAt.toDateString()}</div>
		</div>
	);
};
