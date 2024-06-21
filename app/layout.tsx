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
	description: 'Assuma o controle do seu dinheiro com Finnancia',
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
				<ThemeProvider fontClassName={montserrat.className}>{children}</ThemeProvider>
			</html>
		</SessionProvider>
	);
}
