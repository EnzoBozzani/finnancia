import Script from 'next/script';

import { Toaster } from '@/components/ui/sonner';
import { Logo } from '@/components/Logo';
import { currentUser } from '@/lib/auth';
import { ModalProvider } from '@/components/modals/ModalProvider';

import { Sidebar } from './_components/Sidebar';
import { UserButton } from './_components/UserButton';
import { ThemeSwitch } from './_components/ThemeSwitch';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser();

	if (!user) return;

	return (
		<>
			<div className='flex-1'>
				<header className='mx-auto max-w-screen-xl w-full flex items-center justify-between'>
					<div className='flex items-center'>
						<Sidebar />
						<Logo
							hideFully
							className='w-fit'
							isNotLink
						/>
					</div>
					<div className='flex items-center'>
						<div className='hidden md:block'>
							<ThemeSwitch />
						</div>
						<UserButton user={user} />
					</div>
				</header>
				<ModalProvider />
				<Toaster
					duration={2000}
					theme='system'
				/>
				{children}
			</div>
			<Script src='https://jsuites.net/v4/jsuites.js'></Script>
		</>
	);
};

export default DashboardLayout;
