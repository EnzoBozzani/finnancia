'use client';

import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';

import { FormGroup } from '@/components/FormGroup';
import { FormMessage } from '@/components/FormMessage';
import { Button } from '@/components/ui/button';

import { Social } from './Social';
import { AuthService } from '@/services/AuthService';

export const LoginForm = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [message, setMessage] = useState<string | null>(null);
	const [messageType, setMessageType] = useState<'error' | 'success'>('success');

	const onSubmit = async (ev: FormEvent) => {
		ev.preventDefault();
		setMessage(null);

		if (emailRef.current?.value === '' || passwordRef.current?.value === '') {
			setMessageType('error');
			setMessage('All fields are required!');
			return;
		}

		const res = await AuthService.login({
			email: emailRef.current?.value,
			password: passwordRef.current?.value,
		});

		if (res.error) {
			setMessageType('error');
			setMessage(res.error);
		}
	};

	return (
		<section className='w-[95%] sm:w-[500px] py-12 mt-12 mb-24 bg-white rounded-xl shadow-lg'>
			<h1 className='text-2xl text-center'>LOGO</h1>
			<p className='text-sm text-neutral-500 text-center'>Welcome back!</p>
			<form
				onSubmit={onSubmit}
				className='flex flex-col items-center gap-y-8 px-8 sm:px-20 mt-12'
			>
				<FormGroup
					id='email'
					label='Email'
					className='w-[90%] sm:w-[370px]'
					placeholder='john@example.com'
					type='email'
					inputRef={emailRef}
				/>
				<FormGroup
					id='password'
					label='Password'
					className='w-[90%] sm:w-[370px]'
					type='password'
					placeholder='******'
					inputRef={passwordRef}
				/>
				<Button
					type='submit'
					className='w-[90%] sm:w-[370px] text-base'
				>
					Login
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
					href={'/auth/register'}
				>
					Don't have an account?
				</Link>
			</div>
		</section>
	);
};
