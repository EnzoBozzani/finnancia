'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';

import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

interface PaginationProps {
	numberOfGroups: number;
	selectedPage: number;
	setSelectedPage: Dispatch<SetStateAction<number>>;
	isMobile?: boolean;
	isLoading: boolean;
}

export const Pagination = ({
	numberOfGroups,
	selectedPage,
	setSelectedPage,
	isMobile = false,
	isLoading,
}: PaginationProps) => {
	const isDark = useIsDarkTheme();

	if (isMobile) {
		return (
			<div
				className={cn(
					'fixed bottom-6 left-[50%] -translate-x-1/2 flex items-center justify-center px-4 rounded-full',
					isDark ? 'text-white bg-neutral-800' : 'text-black bg-neutral-200'
				)}
			>
				<ChevronLeftIcon
					className={cn(
						'w-8 h-8 border rounded-full',
						selectedPage === 0 || isLoading
							? cn(
									'cursor-default',
									isDark
										? 'text-neutral-700 border-neutral-700'
										: 'text-neutral-300 border-neutral-300'
							  )
							: cn('cursor-pointer', isDark ? 'border-white' : 'border-black')
					)}
					onClick={() => {
						if (!isLoading) {
							setSelectedPage((current) => (current === 0 ? current : current - 1));
						}
					}}
				/>
				<div>
					<p className='p-4 text-2xl font-bold'>{selectedPage + 1}</p>
				</div>
				<ChevronRightIcon
					className={cn(
						'w-8 h-8 border rounded-full',
						selectedPage === numberOfGroups - 1 || numberOfGroups === 0 || isLoading
							? cn(
									'cursor-default',
									isDark
										? 'text-neutral-700 border-neutral-700'
										: 'text-neutral-300 border-neutral-300'
							  )
							: cn('cursor-pointer', isDark ? 'border-white' : 'border-black')
					)}
					onClick={() => {
						if (!isLoading) {
							setSelectedPage((current) =>
								current === numberOfGroups - 1 || numberOfGroups === 0 ? current : current + 1
							);
						}
					}}
				/>
			</div>
		);
	}

	return (
		<div className={cn('flex items-center justify-center mb-4', isDark ? 'text-white' : 'text-black')}>
			<ChevronLeftIcon
				className={cn(
					'w-10 h-10 border rounded-full',
					selectedPage === 0 || isLoading
						? cn(
								'cursor-default',
								isDark ? 'text-neutral-700 border-neutral-700' : 'text-neutral-300 border-neutral-300'
						  )
						: cn('cursor-pointer', isDark ? 'border-white' : 'border-black')
				)}
				onClick={() => {
					if (!isLoading) {
						setSelectedPage((current) => (current === 0 ? current : current - 1));
					}
				}}
			/>
			<div>
				<p className='p-4 text-3xl font-bold'>{selectedPage + 1}</p>
			</div>
			<ChevronRightIcon
				className={cn(
					'w-10 h-10 border rounded-full',
					selectedPage === numberOfGroups - 1 || numberOfGroups === 0 || isLoading
						? cn(
								'cursor-default',
								isDark ? 'text-neutral-700 border-neutral-700' : 'text-neutral-300 border-neutral-300'
						  )
						: cn('cursor-pointer', isDark ? 'border-white' : 'border-black')
				)}
				onClick={() => {
					if (!isLoading) {
						setSelectedPage((current) =>
							current === numberOfGroups - 1 || numberOfGroups === 0 ? current : current + 1
						);
					}
				}}
			/>
		</div>
	);
};
