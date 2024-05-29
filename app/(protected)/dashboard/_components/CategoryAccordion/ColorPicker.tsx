'use client';

import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';

import { Color, colors } from '@/constants/colors';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { categoriesService } from '@/services/categoriesService';
import { Loader } from '@/components/Loader';

type ColorPickerProps = {
	selectedColor: Color;
	setSelectedColor: Dispatch<SetStateAction<Color>>;
};

export const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	const [usedColors, setUsedColors] = useState<Color[]>([]);

	useEffect(() => {
		startTransition(async () => {
			const res = await categoriesService.getUsedColors();

			if (res.error) {
				setUsedColors([]);
				return;
			}

			if (res.colors) {
				setUsedColors(res.colors);
			}
		});
	}, []);

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
				{pending ? (
					<Loader />
				) : (
					colors.map((color) => {
						const isUsed = usedColors.includes(color);

						const bgColor =
							color === 'transparent' ? 'transparent' : isDark ? `bg-${color}-950` : `bg-${color}-100`;

						return (
							<div
								onClick={() => {
									if (!isUsed) {
										setSelectedColor(color);
									}
								}}
								key={color}
								className={cn(
									`flex items-center justify-center w-[30px] aspect-square border-2 border-neutral-300 cursor-pointer rounded hover:border-sky-700`,
									isUsed && 'hover:border-neutral-300 cursor-default',
									isDark && isUsed && 'hover:border-neutral-700',
									isDark && `border-neutral-700`,
									bgColor,
									selectedColor === color && 'border-sky-500',
									'text-neutral-500'
								)}
							>
								{color === 'transparent' && '-'}
								{isUsed && 'X'}
							</div>
						);
					})
				)}
				<div className='hidden bg-red-100 bg-orange-100 bg-amber-100 bg-yellow-100 bg-lime-100 bg-green-100 bg-emerald-100 bg-teal-100 bg-cyan-100 bg-sky-100 bg-blue-100 bg-indigo-100 bg-violet-100 bg-purple-100 bg-fuchsia-100 bg-pink-100 bg-rose-100 bg-red-950 bg-orange-950 bg-amber-950 bg-yellow-950 bg-lime-950 bg-green-950 bg-emerald-950 bg-teal-950 bg-cyan-950 bg-sky-950 bg-blue-950 bg-indigo-950 bg-violet-950 bg-purple-950 bg-fuchsia-950 bg-pink-950 bg-rose-950' />
			</div>
		</div>
	);
};
