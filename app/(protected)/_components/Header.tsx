import { Logo } from '@/components/Logo';

import { ThemeSwitch } from './ThemeSwitch';
import { UserButton } from './UserButton';
import { Sidebar } from './Sidebar';

export const Header = ({ user }: { user: any }) => {
	return (
		<header className='p-4 w-full flex items-center justify-between'>
			<div className='flex items-center'>
				<div className='block lg:hidden'>
					<Sidebar />
				</div>
				<Logo
					hideFully
					className='w-fit'
					isNotLink
				/>
			</div>
			<div className='flex items-center gap-x-4'>
				<div className='hidden sm:block'>
					<ThemeSwitch />
				</div>
				<UserButton user={user} />
			</div>
		</header>
	);
};
