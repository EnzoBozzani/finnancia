'use client';

import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Category } from '@prisma/client';
import { VscLoading } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';

import { Color } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { SelectCategory } from '@/components/SelectCategory';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { categoriesService } from '@/services/categoriesService';

import { ColorPicker } from './ColorPicker';

export const EditCategory = () => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [category, setCategory] = useState<Category | null>(null);
	const [name, setName] = useState<string>('');
	const [selectedColor, setSelectedColor] = useState<Color>('transparent');

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

			router.refresh();
			setTimeout(() => toast.success(res.success), 2500);
		});
	};

	useEffect(() => {
		setName(category?.name || '');
		setSelectedColor((category?.color as Color) || 'transparent');
	}, [category]);

	return (
		<form
			action={onEdit}
			className='space-y-8'
		>
			<SelectCategory
				setSelectedCategory={setCategory}
				disabled={isPending}
			/>
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
						initialColor={category.color as Color}
					/>
					<div className='w-full flex justify-center items-center'>
						<Button
							size={'lg'}
							disabled={isPending}
							type='submit'
						>
							{isPending ? (
								<>
									<VscLoading className='animate-spin sm:mr-2' /> Editando
								</>
							) : (
								'Editar'
							)}
						</Button>
					</div>
				</>
			)}
		</form>
	);
};
