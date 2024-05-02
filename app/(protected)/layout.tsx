import Script from 'next/script';

import { currentUser } from '@/lib/auth';
import { ToasterProvider } from '@/components/ToasterProvider';
import { ModalProvider } from '@/components/modals/ModalProvider';

import { Header } from './_components/Header';
import { Sidebar } from './_components/Sidebar';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser();

	if (!user) return;

	return (
		<>
			<div className='min-h-full max-w-[1400px] mx-auto'>
				<Header user={user} />
				<div className='flex min-h-full'>
					<div className='hidden lg:block'>
						<Sidebar />
					</div>
					{children}
				</div>
				<ModalProvider />
				<ToasterProvider />
			</div>
			<Script src='https://jsuites.net/v4/jsuites.js'></Script>
		</>
	);
};

export default DashboardLayout;
