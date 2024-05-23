'use client';

import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { VscLoading } from 'react-icons/vsc';

import { categoriesService } from '@/services/categoriesService';
import { FormGroup } from '@/components/FormGroup';
import { Button } from '@/components/ui/button';
import { Color } from '@/constants/colors';

import { ColorPicker } from './ColorPicker';

export const AddCategory = () => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [selectedColor, setSelectedColor] = useState<Color>('null');

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

			router.refresh();
			setTimeout(() => toast.success('Categoria adicionada com sucesso!'), 2500);
		});
	};

	return (
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
					{isPending ? (
						<>
							<VscLoading className='animate-spin sm:mr-2' /> Adicionando
						</>
					) : (
						'Adicionar'
					)}
				</Button>
			</div>
		</form>
	);
};
