'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import { ExpensesSheet } from './_components/ExpensesSheet';

const DashboardPage = ({ params }: { params: { sheetId: string } }) => {
	const user = useCurrentUser();

	//fazer o fetch da sheet

	return (
		<div>
			{JSON.stringify(user)}
			<button onClick={() => signOut()}>Sign Out</button>
			{/* <ExpensesSheet sheetData={} /> */}
		</div>
	);
};

export default DashboardPage;
