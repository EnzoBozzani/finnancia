'use client';

import { Category } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { categoriesService } from '@/services/categoriesService';
import { toast } from 'sonner';

type SelectCategoryProps = {
	setSelectedCategory: Dispatch<SetStateAction<string | null>>;
};

export const SelectCategory = ({ setSelectedCategory }: SelectCategoryProps) => {
	const [isPending, startTransition] = useTransition();
	const [categories, setCategories] = useState<Category[]>([]);

	const isDark = useIsDarkTheme();

	useEffect(() => {
		const fetchCategories = () => {
			startTransition(async () => {
				const res = await categoriesService.getCategories();

				if (res.error) {
					toast.error(res.error);
					return;
				}

				setCategories(res);
			});
		};
		fetchCategories();
	}, []);

	return (
		<>
			{isPending ? (
				<Skeleton className='mx-auto w-[90%] h-12' />
			) : (
				<Select
					onValueChange={(value) => {
						setSelectedCategory(value);
					}}
				>
					<SelectTrigger
						className={cn('mx-auto w-[90%] text-base sm:text-lg py-6', isDark && 'border-neutral-800')}
					>
						<SelectValue placeholder='Selecionar categoria' />
					</SelectTrigger>
					<SelectContent className={cn('p-0 h-[200px]', isDark && 'bg-neutral-950 border-neutral-800')}>
						{categories.map((category) => (
							<SelectItem
								key={`${category.id}`}
								value={category.id}
								className={cn('cursor-pointer rounded-none', isDark ? 'focus:opacity-90' : '')}
								style={{ backgroundColor: category.color || 'transparent' }}
							>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</>
	);
};
