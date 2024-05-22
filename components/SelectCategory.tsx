'use client';

import { Category } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

type SelectCategoryProps = {
	setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const SelectCategory = ({ setSelectedCategory }: SelectCategoryProps) => {
	const [isPending, startTransition] = useTransition();
	const [categories, setCategories] = useState<Category[]>([]);

	const isDark = useIsDarkTheme();

	useEffect(() => {
		const fetchCategories = async () => {
			startTransition(() => {
				//TODO: Implementar a lógica de buscar as categorias
			});
		};
		fetchCategories();
	}, []);

	return (
		<>
			{isPending ? (
				<Skeleton className='w-[240px] sm:w-[400px] h-12' />
			) : (
				<Select
					onValueChange={(value) => {
						setSelectedCategory(value);
					}}
				>
					<SelectTrigger
						className={cn(
							'w-[240px] sm:w-[400px] text-base sm:text-lg py-6',
							isDark && 'border-neutral-800'
						)}
					>
						<SelectValue placeholder='Selecionar categoria' />
					</SelectTrigger>
					<SelectContent
						className={cn('h-[200px]', isDark && 'bg-neutral-950 border-neutral-800 text-neutral-100')}
					>
						{categories.map((category) => (
							<SelectItem
								key={`${category.id}`}
								value={category.id}
								className={cn(
									'cursor-pointer',
									isDark ? 'focus:bg-neutral-900 focus:text-neutral-100' : ''
								)}
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
