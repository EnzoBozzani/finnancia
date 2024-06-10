'use client';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { ThemeSwitch } from '../../_components/ThemeSwitch';
import { cn } from '@/lib/utils';

export const ThemeSwitcher = () => {
	const isDark = useIsDarkTheme();

	return (
		<>
			<h1 className={cn('text-3xl font-bold w-[95%] mx-auto mb-8', isDark && 'text-white')}>CONFIGURAÇÕES</h1>
			<div
				className={cn(
					'flex flex-col sm:flex-row items-center justify-between mx-auto w-[95%] border rounded-xl p-4 gap-6',
					isDark ? 'bg-neutral-900 text-white border-neutral-700' : 'bg-neutral-100 text-black'
				)}
			>
				<div>
					<h2 className='text-center sm:text-start text-lg font-semibold'>TEMA</h2>
					<p className='text-center sm:text-start text-sm text-neutral-500'>
						Escolha o tema de sua preferência
					</p>
				</div>
				<ThemeSwitch />
			</div>
		</>
	);
};
