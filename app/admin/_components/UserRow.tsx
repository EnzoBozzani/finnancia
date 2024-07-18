import { User } from '@prisma/client';

export const UserRow = ({ user }: { user: User }) => {
	return (
		<div className='w-full flex justify-between items-center border-b p-6'>
			<div className='w-1/2 text-center'>{user.email}</div>
			<div className='w-1/2 text-center'>{user.name}</div>
		</div>
	);
};
