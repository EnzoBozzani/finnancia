import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
	title: {
		default: 'Fine Finance',
		template: 'Fine Finance - %s',
	},
	description: 'Finance Control',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn('bg-black flex flex-col', montserrat.className)}>{children}</body>
		</html>
	);
}
