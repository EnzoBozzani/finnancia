'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState, useTransition } from 'react';
import { Finance, Category } from '@prisma/client';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { financesService } from '@/services/financesService';

import { SheetPieChart } from './SheetPieChart';
import { Skeleton } from '../ui/skeleton';

interface PaginationProps {
	numberOfGroups: number;
	selectedPage: number;
	setSelectedPage: Dispatch<SetStateAction<number>>;
	isMobile?: boolean;
	isLoading: boolean;
	sheetId?: string;
}

export const Pagination = ({
	numberOfGroups,
	selectedPage,
	setSelectedPage,
	isMobile = false,
	isLoading,
	sheetId,
}: PaginationProps) => {
	const isDark = useIsDarkTheme();

	const [finances, setFinances] = useState<(Finance & { category?: Category })[]>([]);

	const [pending, startTransition] = useTransition();

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

	useEffect(() => {
		const fetchData = () => {
			startTransition(async () => {
				if (!sheetId) return;

				setFinances([]);

				const res = await financesService.getFinancesWithCategories(sheetId);

				if (res.error) {
					toast.error(res.error);
					return;
				}

				setFinances(res.finances);
			});
		};
		fetchData();
	}, []);

	return (
		<>
			<div className='w-[95%] mx-auto flex justify-center items-center mb-4'>
				<div className={cn('flex items-center justify-center', isDark ? 'text-white' : 'text-black')}>
					<ChevronLeftIcon
						className={cn(
							'w-10 h-10 border rounded-full',
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
						<p className='p-4 text-3xl font-bold'>{selectedPage + 1}</p>
					</div>
					<ChevronRightIcon
						className={cn(
							'w-10 h-10 border rounded-full',
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
			</div>
			{pending ? (
				<div className='w-[95%] mx-auto flex items-center justify-evenly gap-x-2 mb-12'>
					<Skeleton className='w-[400px] h-[400px] rounded-xl' />
					<Skeleton className='w-[400px] h-[400px] rounded-xl' />
				</div>
			) : (
				<SheetPieChart finances={finances} />
			)}
		</>
	);
};
