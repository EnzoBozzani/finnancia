import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { ThemeProvider } from '@/components/ThemeProvider';
import { montserrat } from '@/constants/font';

import './globals.css';

export const metadata: Metadata = {
	title: {
		default: 'Finnancia',
		template: 'Finnancia - %s',
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
			<html
				lang='pt'
				suppressHydrationWarning
			>
				{/* <body className={cn('flex flex-col', montserrat.className)}>
					<ThemeProvider enableSystem>{children}</ThemeProvider>
				</body> */}
				<ThemeProvider fontClassName={montserrat.className}>{children}</ThemeProvider>
			</html>
		</SessionProvider>
	);
}
