import { ImageResponse } from 'next/og';

import { Logo } from '@/components/Logo';

export const runtime = 'edge';

export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		(
			<Logo
				hideFully
				isNotLink
				className='w-full h-full'
			/>
		),
		{
			...size,
		}
	);
}
