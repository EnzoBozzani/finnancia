import { Metadata } from 'next';
import { HeroSection } from '../_components/HeroSection';

export const metadata: Metadata = {
	title: 'Manage your money',
};

const LandingPage = async () => {
	return <HeroSection />;
};

export default LandingPage;
