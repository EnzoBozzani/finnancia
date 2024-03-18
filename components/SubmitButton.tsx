'use client';

import { useFormStatus } from 'react-dom';
import { MdEdit } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';
import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export const SubmitButton = ({ type }: { type: 'edit' | 'add' | 'delete' }) => {
	const { pending } = useFormStatus();

	return (
		<div className='flex justify-center items-center'>
			<Button
				size={'lg'}
				type='submit'
				className={cn('text-lg', type === 'delete' && 'bg-destructive hover:bg-destructive/90')}
				disabled={pending}
			>
				{pending ? (
					<>
						<VscLoading className='animate-spin mr-2' />{' '}
						{type === 'edit' ? 'Editando' : type === 'add' ? 'Adicionando' : 'Removendo'}
					</>
				) : (
					<>
						{type === 'edit' ? (
							<>
								<MdEdit className='w-6 h-6 mr-2' />
								Editar
							</>
						) : type === 'add' ? (
							<>
								<PlusIcon className='h-6 w-6 mr-2' />
								Adicionar
							</>
						) : (
							<>
								<FaTrash className='w-6 h-6 mr-2' />
								Remover
							</>
						)}
					</>
				)}
			</Button>
		</div>
	);
};
