'use client';

import { useEffect, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { CiCreditCard1, CiSettings } from 'react-icons/ci';
import { MdDashboardCustomize } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Loader } from '@/components/Loader';
import { cn, orderYearsForSelectSheet } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from '@/components/ui/select';
import { useAddSheetModal } from '@/hooks/useAddSheetModal';
import { sheetsService } from '@/services/sheetsService';

type SheetMonth = {
	name: string;
	id: string;
	order: number;
};

type Year = {
	order: number;
	sheets: SheetMonth[];
};

export const DesktopSidebar = () => {
	const router = useRouter();

	const currentUser = useCurrentUser();

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
	}, []);

	return (
		<aside
			className={cn(
				'w-[350px] min-h-full hidden lg:block border-r pe-4',
				isDark ? 'bg-neutral-950 text-white border-r-neutral-700' : 'bg-white'
			)}
		>
			{isLoading ? (
				<>
					<div className='h-full w-full flex justify-center items-center'>
						<Loader />
					</div>
				</>
			) : (
				<>
					<header className='p-4'>
						<h1 className={cn('font-bold', isDark ? 'text-white' : '')}>
							Olá{currentUser?.name?.split(' ')[0] ? ', ' + currentUser?.name?.split(' ')[0] : ''}!
						</h1>
						<p className='text-justify'>
							Faça o gerenciamento de suas finanças aqui. Navegue entre planilhas, adicione finanças
							mensais e altere seus dados.
						</p>
					</header>
					<div className='mt-12'>
						<div className='my-12 flex justify-center items-center'>
							<Select
								open={isSelectOpen}
								onOpenChange={setIsSelectOpen}
								onValueChange={(value) => {
									router.push(`/dashboard/${value}`);
								}}
							>
								<SelectTrigger className='w-[95%] text-lg py-6'>
									<SelectValue placeholder='Selecionar planilha' />
								</SelectTrigger>
								<SelectContent
									className={cn('h-[200px]', isDark ? 'bg-neutral-900 text-neutral-100' : '')}
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
														isDark ? 'focus:bg-neutral-800 focus:text-neutral-100' : ''
													)}
												>
													{sheet.name}
												</SelectItem>
											))}
										</SelectGroup>
									))}
								</SelectContent>
							</Select>
						</div>
						{isSelectOpen ? (
							<>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<MdDashboardCustomize className='w-8 h-8 mr-2' />
									Painel
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<PlusIcon className='w-8 h-8 mr-2' />
									Adicionar planilha
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<CiCreditCard1 className='w-8 h-8 mr-2' />
									Planos
								</div>
								<div
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<CiSettings className='w-8 h-8 mr-2' />
									Configurações
								</div>
							</>
						) : (
							<>
								<Link
									href={'/dashboard'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<MdDashboardCustomize className='w-8 h-8 mr-2' />
									Painel
								</Link>
								<div
									role='button'
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
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
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<CiCreditCard1 className='w-8 h-8 mr-2' />
									Planos
								</Link>
								<Link
									href={'/settings'}
									className={cn(
										'p-3 flex items-center',
										isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
									)}
								>
									<CiSettings className='w-8 h-8 mr-2' />
									Configurações
								</Link>
							</>
						)}
					</div>
				</>
			)}
		</aside>
	);
};
