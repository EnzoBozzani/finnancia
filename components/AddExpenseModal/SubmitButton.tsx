'use client';

import { useFormStatus } from 'react-dom';
import { PlusIcon } from '@radix-ui/react-icons';
import { VscLoading } from 'react-icons/vsc';

import { Button } from '@/components/ui/button';

export const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<div className='flex justify-center items-center'>
			<Button
				size={'lg'}
				type='submit'
				className='text-lg'
				disabled={pending}
			>
				{pending ? (
					<>
						<VscLoading className='animate-spin mr-2' /> Adicionando
					</>
				) : (
					<>
						<PlusIcon className='h-6 w-6 mr-2' />
						Adicionar
					</>
				)}
			</Button>
		</div>
	);
};
