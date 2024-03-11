'use client';

import { useFormStatus } from 'react-dom';
import { MdEdit } from 'react-icons/md';
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
						<VscLoading className='animate-spin mr-2' /> Editando
					</>
				) : (
					<>
						<MdEdit className='w-6 h-6 mr-2' />
						Editar
					</>
				)}
			</Button>
		</div>
	);
};
