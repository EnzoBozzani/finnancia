import Script from 'next/script';

import { AddExpenseModal } from '@/components/AddExpenseModal';

import { Sidebar } from './_components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='flex-1'>
				<Sidebar />
				<AddExpenseModal />
				{children}
			</div>
			<Script src='https://jsuites.net/v4/jsuites.js'></Script>
		</>
	);
};

export default DashboardLayout;
