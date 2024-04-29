'use client';

import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { Finance, Sheet } from '@prisma/client';
import { useFormStatus } from 'react-dom';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { currencyFormat, cn } from '@/lib/utils';
import { sheetsService } from '@/services/sheetsService';
interface ExportXLSXProps {
	sheetId: string;
}

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface SheetResponse {
	sheet: SheetWithFinances;
}

export const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<div className='flex justify-center items-center'>
			<Button
				type='submit'
				className={cn('py-6')}
				disabled={pending}
			>
				{pending ? (
					<>
						<VscLoading className='animate-spin sm:mr-2' /> <p className='hidden sm:block'>Exportando</p>
					</>
				) : (
					<>
						<PiMicrosoftExcelLogoFill className='w-8 h-8 sm:mr-2' />
						<p className='hidden sm:block'>Exportar</p>
					</>
				)}
			</Button>
		</div>
	);
};

export const ExportXLSX = ({ sheetId }: ExportXLSXProps) => {
	const onDownload = async () => {
		const { sheet: sheetData }: SheetResponse = await sheetsService.getSheetById(sheetId);

		if (sheetData.finances.length === 0) {
			toast.error('Não é possível exportar uma planilha vazia!');
			return;
		}

		const data = [['Título', 'Tipo', 'Quantia', 'Data']];

		sheetData.finances.forEach((finance) => {
			data.push([
				finance.title,
				finance.type === 'PROFIT' ? 'Ganho' : 'Despesa',
				`${finance.type === 'PROFIT' ? '+' : '-'} ${currencyFormat(finance.amount)}`,
				finance.date.replaceAll('/', '-'),
			]);
		});
		data.push(['Saldo total:', '', '', currencyFormat(sheetData.totalAmount)]);

		const sheet = xlsx.utils.aoa_to_sheet(data);
		const workbook = xlsx.utils.book_new();
		xlsx.utils.book_append_sheet(workbook, sheet, sheetData.name.replaceAll('/', '-'));
		const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
		saveAs(new Blob([buffer]), `${sheetData.name.replaceAll('/', '-')}.xlsx`);
	};

	return (
		<form action={onDownload}>
			<SubmitButton />
		</form>
	);
};
