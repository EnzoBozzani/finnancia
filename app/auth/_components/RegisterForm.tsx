'use client';

import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';

import { FormGroup } from '@/components/FormGroup';
import { Button } from '@/components/ui/button';
import { FormMessage } from '@/components/FormMessage';

import { Social } from './Social';
import { AuthService } from '@/services/AuthService';

export const RegisterForm = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [message, setMessage] = useState<string | null>(null);
	const [messageType, setMessageType] = useState<'error' | 'success'>('success');

	const onSubmit = async (ev: FormEvent) => {
		ev.preventDefault();

		if (nameRef.current?.value === '' || emailRef.current?.value === '' || passwordRef.current?.value === '') {
			setMessageType('error');
			setMessage('All fields are required!');
			return;
		}

		setMessage(null);

		const res = await AuthService.register({
			name: nameRef.current?.value,
			email: emailRef.current?.value,
			password: passwordRef.current?.value,
		});

		if (res.error) {
			setMessageType('error');
			setMessage(res.error);
			return;
		}

		if (res.success) {
			setMessage('success');
			setMessage(res.success);
			nameRef.current!.value = '';
			emailRef.current!.value = '';
			passwordRef.current!.value = '';
		}
	};

	return (
		<section className='w-[95%] sm:w-[500px] py-12 mt-12 mb-24 bg-white rounded-xl shadow-lg'>
			<h1 className='text-2xl text-center'>LOGO</h1>
			<p className='text-sm text-neutral-500 text-center'>Create an account</p>
			<form
				onSubmit={onSubmit}
				className='flex flex-col items-center gap-y-8 px-8 sm:px-20 mt-12'
			>
				<FormGroup
					id='name'
					label='Name'
					className='w-[90%] sm:w-[370px]'
					placeholder='John Example'
					inputRef={nameRef}
				/>
				<FormGroup
					id='email'
					label='Email'
					className='w-[90%] sm:w-[370px]'
					placeholder='john@example.com'
					inputRef={emailRef}
					type='email'
				/>
				<FormGroup
					id='password'
					label='Password'
					className='w-[90%] sm:w-[370px]'
					placeholder='******'
					type='password'
					inputRef={passwordRef}
				/>
				<Button
					type='submit'
					className='w-[90%] sm:w-[370px] text-base'
				>
					Register
				</Button>
				<FormMessage
					message={message}
					type={messageType}
					className='w-[90%] sm:w-[370px]'
					setMessage={setMessage}
				/>
			</form>
			<Social />
			<div className='flex justify-center items-center mt-12'>
				<Link
					className='text-sm hover:underline'
					href={'/auth/login'}
				>
					Already have an account?
				</Link>
			</div>
		</section>
	);
};
