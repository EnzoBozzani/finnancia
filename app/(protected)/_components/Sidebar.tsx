'use client';

import { CiSettings } from 'react-icons/ci';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CiCreditCard1 } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { MdDashboardCustomize } from 'react-icons/md';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSidebar } from '@/hooks/useSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sheetsService } from '@/services/sheetsService';
import { Loader } from '@/components/Loader';
import { useAddSheetModal } from '@/hooks/useAddSheetModal';

export const Sidebar = () => {
	const currentUser = useCurrentUser();
	const router = useRouter();

	const isOpen = useSidebar((state) => state.isOpen);
	const onOpen = useSidebar((state) => state.onOpen);
	const onClose = useSidebar((state) => state.onClose);

	const onOpenSheetModal = useAddSheetModal((state) => state.onOpen);

	const [sheets, setSheets] = useState<{ name: string; id: string }[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSheets = async () => {
			const res = await sheetsService.getUserSheets();
			setSheets(res);

			setIsLoading(false);
		};
		fetchSheets();
	}, []);

	return (
		<>
			<button
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
			</button>
			<Sheet
				open={isOpen}
				onOpenChange={onClose}
			>
				<SheetContent
					side={'left'}
					className='p-0'
				>
					{isLoading ? (
						<>
							<div className='h-full w-full flex justify-center items-center'>
								<Loader />
							</div>
						</>
					) : (
						<>
							<SheetHeader className='p-4'>
								<SheetTitle>
									Olá{currentUser?.name?.split(' ')[0] ? ', ' + currentUser?.name?.split(' ')[0] : ''}
									!
								</SheetTitle>
								<SheetDescription>
									Faça o gerenciamento de suas finanças aqui. Navegue entre planilhas, adicione
									despesas mensais e altere seus dados.
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
											{sheets.map((sheet, index: number) => (
												<SelectItem
													key={`${sheet.name}-${index}`}
													value={sheet.id}
													className='cursor-pointer text-lg'
												>
													{sheet.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<Link
									href={'/dashboard'}
									className='p-3 flex items-center hover:bg-neutral-200'
									onClick={() => onClose()}
								>
									<MdDashboardCustomize className='w-8 h-8 mr-2' />
									Painel
								</Link>
								<div
									role='button'
									className='p-3 flex items-center hover:bg-neutral-200'
									onClick={() => {
										onClose();
										onOpenSheetModal();
									}}
								>
									<PlusIcon className='w-8 h-8 mr-2' />
									Adicionar planilha
								</div>
								<Link
									href={'/billing'}
									className='p-3 flex items-center hover:bg-neutral-200'
									onClick={() => onClose()}
								>
									<CiCreditCard1 className='w-8 h-8 mr-2' />
									Planos
								</Link>
								<Link
									href={'/settings'}
									className='p-3 flex items-center hover:bg-neutral-200'
									onClick={() => onClose()}
								>
									<CiSettings className='w-8 h-8 mr-2' />
									Configurações
								</Link>
							</div>
						</>
					)}
				</SheetContent>
			</Sheet>
		</>
	);
};
