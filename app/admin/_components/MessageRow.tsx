import { HelpMessage } from '@prisma/client';

export const MessageRow = ({ message }: { message: HelpMessage }) => {
	return (
		<div className='w-full flex justify-between items-center border-b p-6'>
			<div className='w-1/3 text-center'>{message.userEmail}</div>
			<div className='w-1/3 text-center'>{message.body}</div>
			<div className='w-1/3 text-center'>{message.createdAt.toDateString()}</div>
		</div>
	);
};
