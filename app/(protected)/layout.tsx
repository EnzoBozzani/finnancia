import Script from 'next/script';

import { Toaster } from '@/components/ui/sonner';
import { currentUser } from '@/lib/auth';
import { ModalProvider } from '@/components/modals/ModalProvider';

import { DesktopSidebar } from './_components/DesktopSidebar';
import { Header } from './_components/Header';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser();

	if (!user) return;

	return (
		<>
			<div className='min-h-full max-w-[1400px] mx-auto'>
				<Header user={user} />
				<div className='flex min-h-full'>
					<DesktopSidebar />
					{children}
				</div>
				<ModalProvider />
				<Toaster
					closeButton
					duration={2000}
					theme='system'
				/>
			</div>
			<Script src='https://jsuites.net/v4/jsuites.js'></Script>
		</>
	);
};

export default DashboardLayout;
