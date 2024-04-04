'use client';

import { Finance, Sheet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, currencyFormat, organizeInGroupsOf8 } from '@/lib/utils';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

import { Row } from './Row';
import { Pagination } from './Pagination';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface FinancesSheetProps {
	sheetData: SheetWithFinances;
}

export const FinancesSheet = ({ sheetData }: FinancesSheetProps) => {
	const isDark = useIsDarkTheme();

	const router = useRouter();

	const { financesInGroupsOf8, numberOfGroupsOf8 } = organizeInGroupsOf8(sheetData);

	const [selectedGroup, setSelectedGroup] = useState<{ number: number; finances: Finance[] }>({
		number: 0,
		finances: financesInGroupsOf8[0],
	});
	const [numberOfGroups, setNumberOfGroups] = useState(numberOfGroupsOf8);

	useEffect(() => {
		const { financesInGroupsOf8, numberOfGroupsOf8 } = organizeInGroupsOf8(sheetData);
		setSelectedGroup((current) => ({ number: current.number, finances: financesInGroupsOf8[current.number] }));
		setNumberOfGroups(numberOfGroupsOf8);
		router.refresh();
	}, [sheetData]);

	return (
		<div className='hidden lg:block'>
			<h1 className='font-semibold text-center mb-6 text-3xl text-green-600'>{sheetData.name}</h1>
			<div className={cn('max-w-screen-xl w-[95%] mx-auto mb-4')}>
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
						{!selectedGroup.finances || selectedGroup.finances.length === 0 ? (
							<>
								<TableRow>
									<TableCell
										colSpan={4}
										className={cn(
											'text-center font-semibold h-[520px]',
											isDark ? 'bg-neutral-950 text-white' : 'bg-white'
										)}
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
			<Pagination
				financesInGroupsOf8={financesInGroupsOf8}
				numberOfGroups={numberOfGroups}
				selectedGroup={selectedGroup}
				setSelectedGroup={setSelectedGroup}
			/>
		</div>
	);
};
