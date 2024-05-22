'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { Color } from '@/constants/colors';
import { FormGroup } from '@/components/FormGroup';
import { Button } from '@/components/ui/button';
import { categoriesService } from '@/services/categoriesService';
import { SelectCategory } from '@/components/SelectCategory';

import { ColorPicker } from './ColorPicker';

export const CategoryAccordion = () => {
	const isDark = useIsDarkTheme();

	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [selectedColor, setSelectedColor] = useState<Color>(null);
	const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
	const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

	const onCreate = (formData: FormData) => {
		startTransition(async () => {
			const name = formData.get('name') as string;

			if (!name) {
				toast.error('Nome é obrigatório!');
				return;
			}

			const res = await categoriesService.createCategory({ name, color: selectedColor });

			if (res.error) {
				toast.error(res.error);
				return;
			}

			setTimeout(() => router.refresh(), 2000);
			toast.success('Categoria adicionada com sucesso!');
		});
	};

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
					<form
						action={onCreate}
						className='space-y-8'
					>
						<FormGroup
							id='name'
							label='Nome'
							placeholder='Alimentação'
							className='w-[95%] mx-auto'
						/>
						<ColorPicker
							selectedColor={selectedColor}
							setSelectedColor={setSelectedColor}
						/>
						<div className='w-full flex justify-center items-center'>
							<Button
								size={'lg'}
								disabled={isPending}
								type='submit'
							>
								{isPending ? 'Adicionando' : 'Adicionar'}
							</Button>
						</div>
					</form>
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
					<form
						action={() => {}}
						className='space-y-8'
					>
						<SelectCategory setSelectedCategory={setCategoryToEdit} />
					</form>
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
