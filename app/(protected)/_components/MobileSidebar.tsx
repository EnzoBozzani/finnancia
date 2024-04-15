'use client';

import { CiSettings } from 'react-icons/ci';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdDashboardCustomize } from 'react-icons/md';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { SiCircuitverse } from 'react-icons/si';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSidebar } from '@/hooks/useSidebar';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
} from '@/components/ui/select';
import { sheetsService } from '@/services/sheetsService';
import { Loader } from '@/components/Loader';
import { useAddSheetModal } from '@/hooks/useAddSheetModal';
import { cn, orderYearsForSelectSheet } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { Skeleton } from '@/components/ui/skeleton';

type SheetMonth = {
	name: string;
	id: string;
	order: number;
};

type Year = {
	order: number;
	sheets: SheetMonth[];
};

export const MobileSidebar = () => {
	const currentUser = useCurrentUser();

	const isOpen = useSidebar((state) => state.isOpen);
	const onOpen = useSidebar((state) => state.onOpen);
	const onClose = useSidebar((state) => state.onClose);

	const onOpenSheetModal = useAddSheetModal((state) => state.onOpen);

	const isDark = useIsDarkTheme();

	const [sheets, setSheets] = useState<Year[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	useEffect(() => {
		const fetchSheets = async () => {
			const res = await sheetsService.getUserSheets();

			if (res.error) {
				toast.error('Algo deu errado!');
				return;
			}

			const orderedYears = orderYearsForSelectSheet(res);

			setSheets(orderedYears);

			setIsLoading(false);
		};
		fetchSheets();
	}, [isOpen]);

	return (
		<>
			<button
				onClick={onOpen}
				className='p-2 block lg:hidden'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className={cn('w-12 h-12', isDark && 'text-neutral-100')}
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
					className={cn('p-0 border-none block lg:hidden', isDark && 'bg-neutral-950 text-white')}
				>
					<SheetHeader className='p-4'>
						<SheetTitle className={isDark ? 'text-neutral-100' : ''}>
							Olá{currentUser?.name?.split(' ')[0] ? ', ' + currentUser?.name?.split(' ')[0] : ''}!
						</SheetTitle>
						<SheetDescription>
							Faça o gerenciamento de suas finanças aqui. Navegue entre planilhas, adicione finanças
							mensais e altere seus dados.
						</SheetDescription>
					</SheetHeader>
					<div className='mt-12'>
						<div className='my-12 flex justify-center items-center'>
							{isLoading ? (
								<Skeleton className='w-[95%] h-[50px] rounded-xl' />
							) : (
								<Select
									open={isSelectOpen}
									onOpenChange={() => {
										sheets.length === 0
											? onOpenSheetModal()
											: setIsSelectOpen((current) => !current);
									}}
									onValueChange={(value) => {
										redirect(`/dashboard/${value}`);
									}}
								>
									<SelectTrigger
										className={cn('w-[95%] text-lg py-6', isDark && 'border-neutral-800')}
									>
										<SelectValue placeholder='Selecionar planilha' />
									</SelectTrigger>
									<SelectContent
										className={cn(
											'h-[200px]',
											isDark && 'bg-neutral-950 border-neutral-800 text-neutral-100'
										)}
									>
										{sheets.map((year, index: number) => (
											<SelectGroup key={year.order + '-' + index}>
												<SelectLabel className='text-lg font-bold text-center'>
													{year.order}
												</SelectLabel>
												{year.sheets.map((sheet) => (
													<SelectItem
														key={`${sheet.id}-${index}`}
														value={sheet.id}
														className={cn(
															'cursor-pointer',
															isDark ? 'focus:bg-neutral-900 focus:text-neutral-100' : ''
														)}
													>
														{sheet.name}
													</SelectItem>
												))}
											</SelectGroup>
										))}
									</SelectContent>
								</Select>
							)}
						</div>
						{isSelectOpen ? (
							<>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<MdDashboardCustomize className='w-8 h-8 mr-2' />
									Painel
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<PlusIcon className='w-8 h-8 mr-2' />
									Adicionar planilha
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<CiCreditCard1 className='w-8 h-8 mr-2' />
									Planos
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<CiSettings className='w-8 h-8 mr-2' />
									Configurações
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<SiCircuitverse className='w-8 h-8 mr-2' />
									FinnancIA
								</div>
							</>
						) : (
							<>
								<Link
									href={'/dashboard'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<MdDashboardCustomize className='w-8 h-8 mr-2' />
									Painel
								</Link>
								<div
									role='button'
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
									onClick={() => {
										onOpenSheetModal();
									}}
								>
									<PlusIcon className='w-8 h-8 mr-2' />
									Adicionar planilha
								</div>
								<Link
									href={'/billing'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<CiCreditCard1 className='w-8 h-8 mr-2' />
									Planos
								</Link>
								<Link
									href={'/settings'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<CiSettings className='w-8 h-8 mr-2' />
									Configurações
								</Link>
								<Link
									href={'/ai'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<SiCircuitverse className='w-8 h-8 mr-2' />
									FinnancIA
								</Link>
							</>
						)}
						<div className='flex items-center justify-center my-6 gap-x-1'>
							Precisa de suporte?
							<Link
								href={'/help'}
								className={cn(
									'underline',
									isDark
										? 'text-neutral-600 hover:text-neutral-400'
										: 'text-neutral-400 hover:text-neutral-600'
								)}
							>
								Clique aqui
							</Link>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};
