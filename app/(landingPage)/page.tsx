import { Metadata, Viewport } from 'next';
import { HeroSection } from '../_components/HeroSection';
import { FeaturesSection } from '../_components/FeaturesSection';
import { FAQSection } from '../_components/FAQSection';

export const metadata: Metadata = {
	title: 'Manage your money',
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
		</>
	);
};

export default LandingPage;
