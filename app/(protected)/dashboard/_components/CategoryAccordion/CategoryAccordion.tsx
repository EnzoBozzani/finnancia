'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Category } from '@prisma/client';

import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { AddCategory } from './AddCategory';
import { EditCategory } from './EditCategory';

export const CategoryAccordion = () => {
	const isDark = useIsDarkTheme();
	const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

	return (
		<Accordion
			type='multiple'
			className='mx-auto mt-8'
		>
			<AccordionItem
				value='item-1'
				className={cn(
					'mt-4 bg-neutral-100 border border-neutral-300 rounded-lg',
					isDark && 'bg-neutral-900 border-neutral-700 text-white'
				)}
			>
				<AccordionTrigger className='px-4 text-xl font-semibold'>Adicionar categoria</AccordionTrigger>
				<AccordionContent className='text-justify px-4 text-lg'>
					<AddCategory />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem
				value='item-2'
				className={cn(
					'mt-4 bg-neutral-100 border border-neutral-300 rounded-lg',
					isDark && 'bg-neutral-900 border-neutral-700 text-white'
				)}
			>
				<AccordionTrigger className='px-4 text-xl font-semibold'>Editar categoria</AccordionTrigger>
				<AccordionContent className='text-justify px-4 text-lg'>
					<EditCategory />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem
				value='item-3'
				className={cn(
					'mt-4 bg-neutral-100 border border-neutral-300 rounded-lg',
					isDark && 'bg-neutral-900 border-neutral-700 text-white'
				)}
			>
				<AccordionTrigger className='px-4 text-xl font-semibold'>Remover categoria</AccordionTrigger>
				<AccordionContent className='text-justify px-4 text-lg'>
					<form
						action={() => {}}
						className='space-y-8'
					>
						REMOVER
					</form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
