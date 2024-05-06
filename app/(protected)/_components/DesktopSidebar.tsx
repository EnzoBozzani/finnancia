'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CiCreditCard1, CiSettings } from 'react-icons/ci';
import { SiCircuitverse } from 'react-icons/si';
import { MdDashboardCustomize } from 'react-icons/md';
import { PlusIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';
import { User } from 'next-auth';

import { Skeleton } from '@/components/ui/skeleton';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { Year } from './Sidebar';

interface DesktopSidebarProps {
	isDark: boolean;
	currentUser: User | undefined;
	isLoading: boolean;
	isSelectOpen: boolean;
	isInitialAmountSet: boolean;
	onOpenSetAmountModal: () => void;
	sheets: Year[];
	onOpenSheetModal: () => void;
	setIsSelectOpen: Dispatch<SetStateAction<boolean>>;
}

export const DesktopSidebar = ({
	isDark,
	currentUser,
	isLoading,
	isSelectOpen,
	isInitialAmountSet,
	onOpenSetAmountModal,
	sheets,
	onOpenSheetModal,
	setIsSelectOpen,
}: DesktopSidebarProps) => {
	return (
		<aside
			className={cn(
				'w-[350px] min-h-full hidden lg:block border-r pe-4',
				isDark ? 'bg-neutral-950 text-white border-r-neutral-700' : 'bg-white'
			)}
		>
			<header className='p-4'>
				<h1 className={cn('font-bold', isDark ? 'text-white' : '')}>
					Olá{currentUser?.name?.split(' ')[0] ? ', ' + currentUser?.name?.split(' ')[0] : ''}!
				</h1>
				<p className='text-justify'>
					Faça o gerenciamento de suas finanças aqui! Navegue entre planilhas, visite o painel, veja os
					planos, altere configurações e interaja com a Nanci.
				</p>
			</header>
			<div className='mt-12'>
				<div className='my-12 flex justify-center items-center'>
					{isLoading ? (
						<Skeleton className='w-[95%] h-[50px] rounded-xl' />
					) : (
						<Select
							open={isSelectOpen}
							onOpenChange={() => {
								if (!isInitialAmountSet) {
									onOpenSetAmountModal();
									return;
								}

								if (sheets.length === 0) {
									onOpenSheetModal();
									return;
								}

								setIsSelectOpen((current) => !current);
							}}
							onValueChange={(value) => {
								redirect(`/dashboard/${value}`);
							}}
						>
							<SelectTrigger className={cn('w-[95%] text-lg py-6', isDark && 'border-neutral-800')}>
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
								isInitialAmountSet ? onOpenSheetModal() : onOpenSetAmountModal();
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
							Nanci - IA
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
		</aside>
	);
};
