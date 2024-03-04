'use client';

import { useRef } from 'react';

import { FormGroup } from '@/components/FormGroup';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const Sidebar = () => {
	const currentUser = useCurrentUser();

	const titleRef = useRef<HTMLInputElement | null>(null);
	const amountRef = useRef<HTMLInputElement | null>(null);

	return (
		<Sheet>
			<SheetTrigger
				asChild
				className='p-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-14 h-14 cursor-pointer'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
					/>
				</svg>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<SheetHeader>
					<SheetTitle>Olá, {currentUser?.name}!</SheetTitle>
					<SheetDescription>
						Faça o gerenciamento de suas finanças aqui. Navegue entre planilhas, adicione despesas mensais e
						altere seus dados.
					</SheetDescription>
				</SheetHeader>
				<div className='space-y-12 mt-12'>
					<div>TODO: Form selecionar mês</div>
					<div>
						<form
							onSubmit={() => {}}
							className='space-y-3'
						>
							<h3 className='text-center text-xl font-semibold'>Adicionar despesa</h3>
							<FormGroup
								id='title'
								inputRef={titleRef}
								label='Título'
							/>
							<FormGroup
								id='amount'
								inputRef={amountRef}
								label='Quantia'
							/>
							TODO: INput de dia do mês (limitar apenas ao mês da planilha)
							<div className='flex items-center justify-center'>
								<SheetClose asChild>
									<Button type='submit'>Adicionar</Button>
								</SheetClose>
							</div>
						</form>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
