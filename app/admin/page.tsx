import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const adminEmail = process.env.ADMIN_EMAIL;

const AdminPage = async () => {
	const user = await currentUser();

	if (user.email !== adminEmail) {
		redirect('/auth');
	}

	return <main className='w-full min-h-screen bg-white'></main>;
};

export default AdminPage;
