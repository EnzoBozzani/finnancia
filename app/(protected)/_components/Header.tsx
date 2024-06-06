import { Logo } from '@/components/Logo';

import { UserButton } from './UserButton';
import { Sidebar } from './Sidebar';

type HeaderProps = {
	user: {
		id: string;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
		totalAmount: number;
		isInitialAmountSet: boolean;
		hasUsedFreeReport: boolean;
	};
	isActive: boolean;
};

export const Header = async ({ user, isActive }: HeaderProps) => {
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
			<UserButton
				user={user}
				isActive={isActive}
			/>
		</header>
	);
};
