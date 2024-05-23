'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Category } from '@prisma/client';
import { VscLoading } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';

import { SelectCategory } from '@/components/SelectCategory';
import { Button } from '@/components/ui/button';
import { categoriesService } from '@/services/categoriesService';

export const RemoveCategory = () => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [category, setCategory] = useState<Category | null>(null);

	const onDelete = () => {
		startTransition(async () => {
			if (!category) {
				toast.error('Selecione uma categoria para editar');
				return;
			}

			const res = await categoriesService.deleteCategory(category.id);

			if (res.error) {
				toast.error(res.error);
				return;
			}

			router.refresh();
			setTimeout(() => toast.success(res.success), 2500);
		});
	};

	return (
		<form
			action={onDelete}
			className='space-y-8'
		>
			<SelectCategory
				setSelectedCategory={setCategory}
				disabled={isPending}
			/>
			{category && (
				<div className='w-full flex justify-center items-center'>
					<Button
						size={'lg'}
						disabled={isPending}
						type='submit'
					>
						{isPending ? (
							<>
								<VscLoading className='animate-spin sm:mr-2' /> Removendo
							</>
						) : (
							'Remover'
						)}
					</Button>
				</div>
			)}
		</form>
	);
};
