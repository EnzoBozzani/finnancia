'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const DashboardPage = () => {
	const user = useCurrentUser();

	return (
		<div>
			{JSON.stringify(user)}
			<button onClick={() => signOut()}>Sign Out</button>
		</div>
	);
};

export default DashboardPage;
