'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { CiSettings } from 'react-icons/ci';

export const Sidebar = () => {
	const currentUser = useCurrentUser();

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
			<SheetContent
				side={'left'}
				className='p-0'
			>
				<SheetHeader className='p-4'>
					<SheetTitle>Olá, {currentUser?.name}!</SheetTitle>
					<SheetDescription>
						Faça o gerenciamento de suas finanças aqui. Navegue entre planilhas, adicione despesas mensais e
						altere seus dados.
					</SheetDescription>
				</SheetHeader>
				<div className='mt-12'>
					<div className='my-12'>TODO: Form selecionar mês</div>
					<AddExpenseModal />
					<div
						role='button'
						className='p-3 flex items-center hover:bg-neutral-200'
					>
						<CiSettings className='w-8 h-8 mr-2' />
						Configurações
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
