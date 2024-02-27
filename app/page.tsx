import { currentUser } from '@/lib/auth';
import Link from 'next/link';

const LandingPage = async () => {
	const user = await currentUser();

	return (
		<div>
			{JSON.stringify(user)}
			<Link href='/auth'>Auth</Link>
		</div>
	);
};

export default LandingPage;
