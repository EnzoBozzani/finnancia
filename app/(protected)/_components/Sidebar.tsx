'use client';

import { CiSettings } from 'react-icons/ci';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSidebar } from '@/hooks/useSidebar';
import { useAddExpenseModal } from '@/hooks/useAddExpenseModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sheetsService } from '@/services/sheetsService';
import { useRouter } from 'next/navigation';
import { SignOutButton } from './SignOutButton';

export const Sidebar = () => {
	const currentUser = useCurrentUser();
	const router = useRouter();

	const isOpen = useSidebar((state) => state.isOpen);
	const onOpen = useSidebar((state) => state.onOpen);
	const onClose = useSidebar((state) => state.onClose);
	const onOpenModal = useAddExpenseModal((state) => state.onOpen);

	const [sheets, setsheets] = useState<{ name: string; id: string }[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchsheets = async () => {
			const res = await sheetsService.getUserSheets();
			setsheets(res);

			setIsLoading(false);
		};
		fetchsheets();
	}, []);

	return (
		<>
			<div
				role='button'
				onClick={onOpen}
				className='p-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-12 h-12'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
					/>
				</svg>
			</div>
			<Sheet
				open={isOpen}
				onOpenChange={onClose}
			>
				<SheetContent
					side={'left'}
					className='p-0'
				>
					<SheetHeader className='p-4'>
						<SheetTitle>Olá, {currentUser?.name}!</SheetTitle>
						<SheetDescription>
							Faça o gerenciamento de suas finanças aqui. Navegue entre planilhas, adicione despesas
							mensais e altere seus dados.
						</SheetDescription>
					</SheetHeader>
					<div className='mt-12'>
						<div className='my-12 flex justify-center items-center'>
							<Select
								onValueChange={(value) => {
									onClose();
									router.push(`/dashboard/${value}`);
								}}
							>
								<SelectTrigger className='w-[95%] text-lg py-6 active:border-green-500 focus:border-green-500'>
									<SelectValue placeholder='Selecionar planilha' />
								</SelectTrigger>
								<SelectContent>
									{isLoading ? (
										<>
											<SelectItem
												disabled
												value='disabled'
											>
												Carregando...
											</SelectItem>
										</>
									) : (
										<>
											{sheets.map((sheet, index: number) => (
												<SelectItem
													key={`${sheet.name}-${index}`}
													value={sheet.id}
													className='cursor-pointer text-lg'
												>
													{sheet.name}
												</SelectItem>
											))}
										</>
									)}
								</SelectContent>
							</Select>
						</div>
						<div
							role='button'
							className='p-3 flex items-center hover:bg-neutral-200'
							onClick={() => {
								onClose();
								onOpenModal();
							}}
						>
							<PlusIcon className='w-8 h-8 mr-2' />
							Adicionar despesa
						</div>
						<Link href={'/settings'}>
							<div
								role='button'
								className='p-3 flex items-center hover:bg-neutral-200'
							>
								<CiSettings className='w-8 h-8 mr-2' />
								Configurações
							</div>
						</Link>
					</div>
					<SheetFooter>
						<SignOutButton />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};
