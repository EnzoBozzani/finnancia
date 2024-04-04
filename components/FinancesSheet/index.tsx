'use client';

import { Finance, Sheet } from '@prisma/client';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn, currencyFormat } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { Row } from './Row';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesSheetProps {
	sheetData: SheetWithFinances;
}

export const FinancesSheet = ({ sheetData }: FinancesSheetProps) => {
	const isDark = useIsDarkTheme();

	//tranformar isso num util com a filtragem de dados
	const numberOfGroupsOf8 = Math.ceil(sheetData.finances.length / 8);
	const financesInGroupsOf8: Finance[][] = [];

	let previous = 0;

	for (let i = 1; i <= numberOfGroupsOf8; i++) {
		financesInGroupsOf8.push(
			sheetData.finances.slice(previous, i * 8 > sheetData.finances.length ? sheetData.finances.length : i * 8)
		);
		previous = i * 8;
	}

	const [selectedGroup, setSelectedGroup] = useState<{ number: number; finances: Finance[] }>({
		number: 0,
		finances: financesInGroupsOf8[0],
	});

	useEffect(() => {
		console.log(selectedGroup);
	}, [selectedGroup]);

	return (
		<div className='hidden lg:block'>
			<h1 className='font-semibold text-center mb-6 text-3xl text-green-600'>{sheetData.name}</h1>
			<div className={cn('max-w-screen-xl w-[95%] mx-auto mb-12')}>
				<Table className='text-lg'>
					<TableHeader className='py-4'>
						<TableRow
							className={cn(
								'border-b outline-none text-lg',
								isDark
									? 'bg-neutral-950 hover:bg-neutral-900 border-neutral-700'
									: 'bg-white hover:bg-neutral-100 border-neutral-300'
							)}
						>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Título
							</TableHead>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Quantia
							</TableHead>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Data
							</TableHead>
							<TableHead className={cn('text-center', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody
						style={{
							maxHeight: '300px',
							overflowY: 'scroll',
						}}
					>
						{sheetData.finances.length === 0 ? (
							<>
								<TableRow>
									<TableCell
										className={cn(
											'text-center font-semibold py-6',
											isDark ? 'bg-neutral-950 text-white' : 'bg-white'
										)}
										colSpan={4}
									>
										Nenhuma finança encontrada nessa planilha
									</TableCell>
								</TableRow>
							</>
						) : (
							<>
								{selectedGroup.finances.map((finance) => (
									<Row
										key={finance.id}
										finance={finance}
									/>
								))}
							</>
						)}
					</TableBody>
					<TableFooter className='border-none outline-none'>
						<TableRow
							className={cn(
								'outline-none border-t',
								isDark
									? 'bg-neutral-950 hover:bg-neutral-900 border-neutral-700 text-white'
									: 'bg-white hover:bg-neutral-100 border-neutral-300'
							)}
						>
							<TableCell colSpan={3}>Saldo total:</TableCell>
							<TableCell
								className={cn(
									'text-right font-semibold',
									sheetData.totalAmount >= 0
										? isDark
											? 'text-green-400'
											: 'text-green-700'
										: isDark
										? 'text-red-400'
										: 'text-red-700'
								)}
							>
								{currencyFormat(sheetData.totalAmount)}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<div className='text-white flex'>
				<ChevronLeftIcon
					onClick={() =>
						setSelectedGroup((current) =>
							current.number === 0
								? current
								: { finances: financesInGroupsOf8[current.number - 1], number: current.number - 1 }
						)
					}
				/>
				{selectedGroup.number}
				<ChevronRightIcon
					onClick={() =>
						setSelectedGroup((current) =>
							current.number === numberOfGroupsOf8 - 1
								? current
								: { finances: financesInGroupsOf8[current.number + 1], number: current.number + 1 }
						)
					}
				/>
			</div>
		</div>
	);
};
