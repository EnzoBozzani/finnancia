import Script from 'next/script';

import { AddExpenseModal } from '@/components/modals/AddExpenseModal';
import { Logo } from '@/components/Logo';
import { currentUser } from '@/lib/auth';
import { EditExpenseModal } from '@/components/modals/EditExpenseModal';
import { AddSheetModal } from '@/components/modals/AddSheetModal';

import { Sidebar } from './_components/Sidebar';
import { UserButton } from './_components/UserButton';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser();

	if (!user) return;

	return (
		<>
			<div className='flex-1'>
				<header className='mx-auto max-w-screen-xl w-full flex items-center justify-between'>
					<div className='flex items-center gap-x-4'>
						<Sidebar />
						<Logo
							hideFully
							className='w-fit'
							isNotLink
						/>
					</div>
					<UserButton user={user} />
				</header>
				<AddExpenseModal />
				<EditExpenseModal />
				<AddSheetModal />
				{children}
			</div>
			<Script src='https://jsuites.net/v4/jsuites.js'></Script>
		</>
	);
};

export default DashboardLayout;
