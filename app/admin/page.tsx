import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const adminEmail = process.env.ADMIN_EMAIL;

const AdminPage = async () => {
	const user = await currentUser();

	if (user.email !== adminEmail) {
		redirect('/auth');
	}

	const totalUsers = await db.user.count();

	const totalSubscriptions = await db.userSubscription.count();

	return (
		<main className='w-full min-h-screen bg-white'>
			Total Users: {totalUsers}
			<br />
			Total Subscriptions: {totalSubscriptions}
		</main>
	);
};

export default AdminPage;
