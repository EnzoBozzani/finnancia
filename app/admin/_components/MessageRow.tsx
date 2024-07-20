'use client';

import { HelpMessage } from '@prisma/client';
import { toast } from 'sonner';

export const MessageRow = ({ message }: { message: HelpMessage }) => {
	const handleClick = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success('Copiado para área de transferência');
	};

	return (
		<div className='w-full flex justify-between items-center border-b p-6'>
			<div
				role='button'
				onClick={() => handleClick(message.userEmail)}
				className='w-1/3 text-center truncate hover:text-clip px-2'
			>
				{message.userEmail}
			</div>
			<div
				role='button'
				onClick={() => handleClick(message.body)}
				className='w-1/3 text-center truncate hover:text-clip px-2'
			>
				{message.body}
			</div>
			<div className='w-1/3 text-center truncate hover:text-clip px-2'>{message.createdAt.toDateString()}</div>
		</div>
	);
};
