import { Logo } from '@/components/Logo';
import { MobileSidebar } from './MobileSidebar';
import { ThemeSwitch } from './ThemeSwitch';
import { UserButton } from './UserButton';

export const Header = ({ user }: { user: any }) => {
	return (
		<header className='p-4 w-full flex items-center justify-between'>
			<div className='flex items-center'>
				<MobileSidebar />
				<Logo
					hideFully
					className='w-fit'
					isNotLink
				/>
			</div>
			<div className='flex items-center gap-x-4'>
				<ThemeSwitch />
				<UserButton user={user} />
			</div>
		</header>
	);
};