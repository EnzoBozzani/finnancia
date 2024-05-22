'use client';

import { useState } from 'react';

import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { Color } from '@/constants/colors';
import { FormGroup } from '@/components/FormGroup';

import { ColorPicker } from './ColorPicker';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<div className='w-full flex justify-center items-center'>
			<Button
				size={'lg'}
				disabled={pending}
				type='submit'
			>
				{pending ? 'Adicionando' : 'Adicionar'}
			</Button>
		</div>
	);
};

export const CategoryAccordion = () => {
	const isDark = useIsDarkTheme();

	const [selectedColor, setSelectedColor] = useState<Color>(null);

	const onSubmit = () => {
		//TODO: Implementar a lógica de adicionar uma categoria
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
						action={onSubmit}
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
						<SubmitButton />
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
						action={onSubmit}
						className='space-y-8'
					>
						EDITAR
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
						action={onSubmit}
						className='space-y-8'
					>
						REMOVER
					</form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
