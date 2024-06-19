'use client';

import { CiSettings } from 'react-icons/ci';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Link from 'next/link';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdDashboardCustomize } from 'react-icons/md';
import { User } from 'next-auth';
import { redirect } from 'next/navigation';
import { SiCircuitverse } from 'react-icons/si';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

import { Year } from './Sidebar';

interface MobileSidebarProps {
	isDark: boolean;
	currentUser: User | undefined;
	isLoading: boolean;
	isInitialAmountSet: boolean;
	onOpenSetAmountModal: () => void;
	sheets: Year[];
	onOpenSheetModal: () => void;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const MobileSidebar = ({
	isDark,
	currentUser,
	isLoading,
	isInitialAmountSet,
	onOpenSetAmountModal,
	sheets,
	onOpenSheetModal,
	isOpen,
	onClose,
	onOpen,
}: MobileSidebarProps) => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);

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
						<SheetDescription className='text-xs'>
							Faça o gerenciamento de suas finanças aqui! Navegue entre planilhas, visite o painel, veja
							os planos, altere configurações e interaja com a Nanci.
						</SheetDescription>
					</SheetHeader>
					<div className='mt-6'>
						<div className='mb-6 flex justify-center items-center'>
							{isLoading ? (
								<Skeleton className='w-[95%] h-[50px] rounded-xl' />
							) : (
								<Select
									open={isSelectOpen}
									onOpenChange={() => {
										if (!isInitialAmountSet) {
											onClose();
											onOpenSetAmountModal();
											return;
										}

										if (sheets.length === 0) {
											onClose();
											onOpenSheetModal();
											return;
										}

										setIsSelectOpen((current) => !current);
									}}
									onValueChange={(value) => {
										onClose();
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
									Nanci - IA
								</div>
							</>
						) : (
							<>
								<Link
									onClick={() => onClose()}
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
										onClose();
										isInitialAmountSet ? onOpenSheetModal() : onOpenSetAmountModal();
									}}
								>
									<PlusIcon className='w-8 h-8 mr-2' />
									Adicionar planilha
								</div>
								<Link
									onClick={() => onClose()}
									href={'/plans'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<CiCreditCard1 className='w-8 h-8 mr-2' />
									Planos
								</Link>
								<Link
									onClick={() => onClose()}
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
									onClick={() => onClose()}
									href={'/ai'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-200'
									)}
								>
									<SiCircuitverse className='w-8 h-8 mr-2' />
									Nanci - IA
								</Link>
							</>
						)}
						<div className='text-sm flex items-center justify-center flex-wrap my-6 gap-x-1'>
							Precisa de suporte?
							<Link
								onClick={() => onClose()}
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
