import { redirect } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { AdminBox } from './_components/AdminBox';
import { UserRow } from './_components/UserRow';
import { MessageRow } from './_components/MessageRow';

const adminEmail = process.env.ADMIN_EMAIL;

const AdminPage = async () => {
	const user = await currentUser();

	if (user.email !== adminEmail) {
		redirect('/auth');
	}

	const users = await db.user.findMany();

	const totalSubscriptions = await db.userSubscription.count();

	const messages = await db.helpMessage.findMany();

	return (
		<main className='bg-white w-full min-h-screen mx-auto'>
			<section className='p-6 max-w-[1400px] mx-auto h-full'>
				<div className='w-full mb-8'>
					<h1 className='text-3xl text-center font-bold uppercase'>Finnancia - ADMIN</h1>
				</div>
				<div className='w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
					<AdminBox
						data={users.length}
						title='Total Users'
					/>
					<AdminBox
						data={totalSubscriptions}
						title='Total Subscriptions'
					/>
				</div>
				<div className='w-full mb-2'>
					<h1 className='text-xl text-center font-bold uppercase'>Messages</h1>
				</div>
				<div className='flex flex-col mb-16'>
					<div className='w-full flex justify-between items-center border-b p-6 bg-neutral-100'>
						<div className='w-1/3 text-center'>E-mail</div>
						<div className='w-1/3 text-center'>Mensagem</div>
						<div className='w-1/3 text-center'>Data</div>
					</div>
					{messages.map((message) => (
						<MessageRow
							message={message}
							key={user.id}
						/>
					))}
				</div>
				<div className='w-full mb-2'>
					<h1 className='text-xl text-center font-bold uppercase'>Users</h1>
				</div>
				<div className='flex flex-col mb-8'>
					<div className='w-full flex justify-between items-center border-b p-6 bg-neutral-100'>
						<div className='w-1/2 text-center'>E-mail</div>
						<div className='w-1/2 text-center'>Nome</div>
					</div>
					{users.map((user) => (
						<UserRow
							user={user}
							key={user.id}
						/>
					))}
				</div>
			</section>
		</main>
	);
};

export default AdminPage;
