'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Category } from '@prisma/client';

import { Color } from '@/constants/colors';
import { FormGroup } from '@/components/FormGroup';
import { SelectCategory } from '@/components/SelectCategory';
import { Button } from '@/components/ui/button';

import { ColorPicker } from './ColorPicker';

export const EditCategory = () => {
	const [isPending, startTransition] = useTransition();

	const [category, setCategory] = useState<Category | null>(null);
	const [selectedColor, setSelectedColor] = useState<Color>('null');

	const onEdit = (formData: FormData) => {
		startTransition(async () => {
			const name = formData.get('name') as string;

			if (!category) {
				toast.error('Selecione uma categoria para editar');
				return;
			}

			if (!name) {
				toast.error('Nome é obrigatório!');
				return;
			}

			// const res = await categoriesService.editCategory({ name, color: selectedColor });

			// if (res.error) {
			// 	toast.error(res.error);
			// 	return;
			// }

			// setTimeout(() => router.refresh(), 2000);
			// toast.success('Categoria editada com sucesso!');
		});
	};

	return (
		<form
			action={onEdit}
			className='space-y-8'
		>
			<SelectCategory setSelectedCategory={setCategory} />
			{category && (
				<>
					<FormGroup
						id='name'
						label='Nome'
						placeholder='Alimentação'
						className='w-[95%] mx-auto'
						disabled={!category || isPending}
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
				</>
			)}
		</form>
	);
};
