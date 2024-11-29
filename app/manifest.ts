import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Finnancia',
		short_name: 'Finnancia',
		description: 'Assuma o controle do seu dinheiro com Finnancia',
		start_url: '/dashboard',
		display: 'standalone',
		background_color: '#000',
		theme_color: '#ffffff',
		icons: [72, 96, 128, 144, 152, 192, 384, 512].map((n) => ({
			src: `/icons/icon-${n}x${n}.png`,
			sizes: `${n}x${n}`,
			type: 'image/png',
		})),
	};
}
