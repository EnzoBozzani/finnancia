import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

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
		<main className='w-full min-h-screen bg-white'>
			Total Users: {users.length}
			<br />
			Total Subscriptions: {totalSubscriptions}
			<br />
			Users:
			<br />
			{users.map((user) => `${user.email} `)}
			<br />
			Messages:
			<br />
			{messages.map((message) => (
				<>
					{message.body} {message.userEmail} {message.createdAt.toString()}
					<br />
				</>
			))}
		</main>
	);
};

export default AdminPage;
