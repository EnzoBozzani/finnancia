import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

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
