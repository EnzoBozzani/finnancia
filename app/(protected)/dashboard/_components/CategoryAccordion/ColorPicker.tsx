'use client';

import { Color, colors } from '@/constants/colors';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

type ColorPickerProps = {
	selectedColor: Color;
	setSelectedColor: Dispatch<SetStateAction<Color>>;
};

export const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
	const isDark = useIsDarkTheme();

	return (
		<div className='w-[95%] mx-auto space-y-4'>
			<div>
				<p className='font-semibold'>Escolha uma cor</p>
				<p className='text-neutral-500 text-sm'>(opcional)</p>
			</div>
			<div
				className={cn(
					'flex justify-center gap-4 flex-wrap p-4 bg-neutral-200 rounded-xl border border-neutral-300',
					isDark && 'bg-neutral-800 border-neutral-700'
				)}
			>
				{colors.map((color) => {
					return (
						<div
							onClick={() => setSelectedColor(color)}
							key={color}
							className={cn(
								'flex items-center justify-center w-[30px] aspect-square border-2 border-neutral-300 cursor-pointer rounded hover:border-sky-700',
								isDark && 'border-neutral-700',
								selectedColor === color && 'border-sky-500'
							)}
							style={{ backgroundColor: color !== 'null' ? color : 'transparent' }}
						>
							{color === 'null' && '-'}
						</div>
					);
				})}
			</div>
		</div>
	);
};
