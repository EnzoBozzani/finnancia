'use client';

import { Category } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem, SelectGroup } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { categoriesService } from '@/services/categoriesService';

type SelectCategoryProps = {
	setSelectedCategory: Dispatch<SetStateAction<Category | null>>;
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
			) : categories.length === 0 || !categories ? (
				<div
					className={cn(
						'border border-neutral-200 rounded-xl mx-auto w-[90%] text-base sm:text-lg py-3 flex items-center justify-center',
						isDark && 'border-neutral-800'
					)}
				>
					Nenhuma categoria encontrada
				</div>
			) : (
				<Select
					onValueChange={(value) => {
						setSelectedCategory(categories.find((category) => category.id === value) || null);
					}}
				>
					<SelectTrigger
						className={cn('mx-auto w-[90%] text-base sm:text-lg py-6', isDark && 'border-neutral-800')}
					>
						<SelectValue placeholder='Selecionar categoria' />
					</SelectTrigger>
					<SelectContent className={cn('p-0 h-[200px]', isDark && 'bg-neutral-950 border-neutral-800')}>
						{categories.map((category) => (
							<SelectGroup
								key={`${category.id}`}
								className='pb-2'
							>
								<SelectItem
									value={category.id}
									className={cn(
										'cursor-pointer rounded-none',
										isDark && category.color === 'null' && 'text-white focus:text-white',
										'focus:opacity-80'
									)}
									style={{
										backgroundColor: category.color !== 'null' ? category.color : 'transparent',
									}}
								>
									{category.name}
								</SelectItem>
							</SelectGroup>
						))}
					</SelectContent>
				</Select>
			)}
		</>
	);
};