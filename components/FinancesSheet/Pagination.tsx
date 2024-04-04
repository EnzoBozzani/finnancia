'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { Finance } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
	selectedGroup: { number: number; finances: Finance[] };
	setSelectedGroup: Dispatch<SetStateAction<{ number: number; finances: Finance[] }>>;
	financesInGroupsOf8: Finance[][];
	numberOfGroups: number;
}

export const Pagination = ({
	selectedGroup,
	setSelectedGroup,
	financesInGroupsOf8,
	numberOfGroups,
}: PaginationProps) => {
	const isDark = useIsDarkTheme();

	return (
		<div className={cn('flex items-center justify-center mb-4', isDark ? 'text-white' : 'text-black')}>
			<ChevronLeftIcon
				className={cn(
					'w-10 h-10 border rounded-full',
					selectedGroup.number === 0
						? cn(
								'cursor-default',
								isDark ? 'text-neutral-700 border-neutral-700' : 'text-neutral-300 border-neutral-300'
						  )
						: cn('cursor-pointer', isDark ? 'border-white' : 'border-black')
				)}
				onClick={() =>
					setSelectedGroup((current) =>
						current.number === 0
							? current
							: { finances: financesInGroupsOf8[current.number - 1], number: current.number - 1 }
					)
				}
			/>
			<div>
				<p className='p-4 text-3xl font-bold'>{selectedGroup.number + 1}</p>
			</div>
			<ChevronRightIcon
				className={cn(
					'w-10 h-10 border rounded-full',
					selectedGroup.number === numberOfGroups - 1 || numberOfGroups === 0
						? cn(
								'cursor-default',
								isDark ? 'text-neutral-700 border-neutral-700' : 'text-neutral-300 border-neutral-300'
						  )
						: cn('cursor-pointer', isDark ? 'border-white' : 'border-black')
				)}
				onClick={() =>
					setSelectedGroup((current) =>
						current.number === numberOfGroups - 1 || numberOfGroups === 0
							? current
							: { finances: financesInGroupsOf8[current.number + 1], number: current.number + 1 }
					)
				}
			/>
		</div>
	);
};
