import Script from 'next/script';

import { AddExpenseModal } from '@/components/AddExpenseModal';

import { Sidebar } from './_components/Sidebar';
import { Logo } from '@/components/Logo';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='flex-1'>
				<header className='w-full flex items-center justify-between'>
					<Sidebar />
					<Logo
						hideFully
						className='w-fit me-4'
						isNotLink
					/>
				</header>
				<AddExpenseModal />
				{children}
			</div>
			<Script src='https://jsuites.net/v4/jsuites.js'></Script>
		</>
	);
};

export default DashboardLayout;
