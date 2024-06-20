import { Metadata, Viewport } from 'next';
import Link from 'next/link';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

import { HeroSection } from './_components/HeroSection';
import { FeaturesSection } from './_components/FeaturesSection';
import { FAQSection } from './_components/FAQSection';

export const metadata: Metadata = {
	title: 'Controle seu dinheiro',
	other: {
		'google-site-verification': 'pbAzyYwmVedcR48Od7b-opdn57P5UIo39u5KwzrdqZ4',
	},
};

export const viewport: Viewport = {
	themeColor: '#dcfce7',
};

const LandingPage = async () => {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<FAQSection />
			<footer className='bg-neutral-100 w-full border-t border-neutral-200'>
				<div className='mx-auto max-w-screen-xl px-4 md:px-12 py-6 flex flex-col lg:flex-row items-center justify-between gap-y-8'>
					<Logo className='w-fit' />
					<div className='flex flex-col lg:flex-row items-center gap-4'>
						<Link
							href={'/terms-of-service'}
							className='text-neutral-400 text-lg underline hover:text-neutral-500'
						>
							Termos de serviço
						</Link>
						<Link
							href={'/privacy-policy'}
							className='text-neutral-400 text-lg underline hover:text-neutral-500'
						>
							Política de privacidade
						</Link>
					</div>
					<Button
						size={'lg'}
						asChild
					>
						<Link href={'/auth'}>Comece sem pagar nada</Link>
					</Button>
				</div>
			</footer>
		</>
	);
};

export default LandingPage;
