'use client';

import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Category } from '@prisma/client';

import { Color } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { SelectCategory } from '@/components/SelectCategory';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { categoriesService } from '@/services/categoriesService';

import { ColorPicker } from './ColorPicker';

export const EditCategory = () => {
	const [isPending, startTransition] = useTransition();

	const [category, setCategory] = useState<Category | null>(null);
	const [name, setName] = useState<string>('');
	const [selectedColor, setSelectedColor] = useState<Color>('null');

	const onEdit = () => {
		startTransition(async () => {
			if (!category) {
				toast.error('Selecione uma categoria para editar');
				return;
			}

			if (!name || name.length < 4) {
				toast.error('Nome deve possuir mais de 3 caracteres!');
				return;
			}

			const res = await categoriesService.editCategory(category.id, { name, color: selectedColor });

			if (res.error) {
				toast.error(res.error);
				return;
			}

			toast.success(res.success);
		});
	};

	useEffect(() => {
		setName(category?.name || '');
		setSelectedColor((category?.color as Color) || 'null');
	}, [category]);

	return (
		<form
			action={onEdit}
			className='space-y-8'
		>
			<SelectCategory setSelectedCategory={setCategory} />
			{category && (
				<>
					<div className={cn('space-y-3')}>
						<div>
							<Label
								htmlFor={'name'}
								className='text-lg'
							>
								Nome
							</Label>
						</div>
						<Input
							id={'name'}
							name={'name'}
							className='focus:border-green-400'
							placeholder={category.name}
							type={'text'}
							min={4}
							maxLength={50}
							value={name}
							disabled={isPending}
							onChange={(ev) => setName(ev.target.value)}
						/>
					</div>
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
							{isPending ? 'Editando' : 'Editar'}
						</Button>
					</div>
				</>
			)}
		</form>
	);
};
