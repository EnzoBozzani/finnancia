import { FormGroup } from '@/components/FormGroup';
import { Button } from '@/components/ui/button';

export const LoginForm = () => {
	const onSubmit = async (formData: FormData) => {
		'use server';
	};

	return (
		<section className='max-w-screen-sm py-12 px-4 mt-24 bg-black border border-white rounded-xl text-white'>
			<form
				action={onSubmit}
				className='flex flex-col items-center gap-y-8'
			>
				<FormGroup
					id='user'
					label='User'
					className='w-[250px] md:w-[370px]'
				/>
				<FormGroup
					id='password'
					label='Password'
					className='w-[250px] md:w-[370px]'
				/>
				<Button size={'lg'}>Login</Button>
			</form>
		</section>
	);
};
