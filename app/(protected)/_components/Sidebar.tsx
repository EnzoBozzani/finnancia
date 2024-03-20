'use client';

import { CiSettings } from 'react-icons/ci';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdDashboardCustomize } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

type SheetMonth = {
	name: string;
	id: string;
	order: number;
};

type Year = {
	order: number;
	sheets: SheetMonth[];
};

export const Sidebar = () => {
	const router = useRouter();

	const currentUser = useCurrentUser();

	const isOpen = useSidebar((state) => state.isOpen);
	const onOpen = useSidebar((state) => state.onOpen);
	const onClose = useSidebar((state) => state.onClose);

	const onOpenSheetModal = useAddSheetModal((state) => state.onOpen);

	const [sheets, setSheets] = useState<Year[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSheets = async () => {
			const res = await sheetsService.getUserSheets();

			if (res.error) {
				toast.error('Algo deu errado!');
				return;
			}

			const years = new Set<number>();

			res.forEach((sheet: SheetMonth) => {
				const year = sheet.name.split('/')[1];
				years.add(Number(year));
			});

			const orderedYears: Year[] = [];

			years.forEach((year: number) =>
				orderedYears.push({
					order: year,
					sheets: [],
				})
			);

			orderedYears.sort((a, b) => a.order - b.order);

			res.forEach((sheet: SheetMonth) => {
				const yearNumber = Number(sheet.name.split('/')[1]);
				const yearObject = orderedYears.find((year) => year.order === yearNumber);
				yearObject?.sheets.push({ id: sheet.id, name: sheet.name, order: sheet.order });
			});

			orderedYears.forEach((year) => {
				year.sheets.sort((a, b) => a.order - b.order);
			});

			setSheets(orderedYears);

			setIsLoading(false);
		};
		fetchSheets();
	}, [isOpen]);

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
									finanças mensais e altere seus dados.
								</SheetDescription>
							</SheetHeader>
							<div className='mt-12'>
								<div className='my-12 flex justify-center items-center'>
									<Select
										onValueChange={(value) => {
											router.push(`/dashboard/${value}`);
											onClose();
										}}
									>
										<SelectTrigger className='w-[95%] text-lg py-6 active:border-green-500 focus:border-green-500'>
											<SelectValue placeholder='Selecionar planilha' />
										</SelectTrigger>
										<SelectContent className='h-[200px]'>
											{sheets.map((year, index: number) => (
												<SelectGroup key={year.order + '-' + index}>
													<SelectLabel className='text-lg font-bold text-center'>
														{year.order}
													</SelectLabel>
													{year.sheets.map((sheet) => (
														<SelectItem
															key={`${sheet.id}-${index}`}
															value={sheet.id}
															className='cursor-pointer'
														>
															{sheet.name}
														</SelectItem>
													))}
												</SelectGroup>
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
