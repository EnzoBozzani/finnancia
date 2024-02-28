import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { auth } from '@/auth';

import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
	title: {
		default: 'Financia',
		template: 'Financia - %s',
	},
	description: 'Finance Control',
	icons: [
		{
			url: '/logo.jpg',
			href: '/logo.jpg',
		},
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={cn('bg-neutral-100 flex flex-col', montserrat.className)}>{children}</body>
			</html>
		</SessionProvider>
	);
}
