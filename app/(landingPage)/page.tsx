import { Metadata, Viewport } from 'next';
import Link from 'next/link';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

import { HeroSection } from '../_components/HeroSection';
import { FeaturesSection } from '../_components/FeaturesSection';
import { FAQSection } from '../_components/FAQSection';

export const metadata: Metadata = {
	title: 'Controle seu dinheiro',
};

export const viewport: Viewport = {
	themeColor: '#dcfce7',
};

const LandingPage = async () => {
	return (
		<>
			<header className='bg-green-100 w-full'>
				<div className='mx-auto max-w-screen-xl px-4 md:px-12 py-4 flex items-center justify-between'>
					<Logo className='w-fit' />
					<Button asChild>
						<Link href={'/auth'}>Entrar</Link>
					</Button>
				</div>
			</header>
			<HeroSection />
			<FeaturesSection />
			<FAQSection />
		</>
	);
};

export default LandingPage;
