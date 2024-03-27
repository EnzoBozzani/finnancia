'use client';

import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { Finance, Sheet } from '@prisma/client';
import { toast } from 'sonner';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface ExportXLSXProps {
	sheetData: SheetWithFinances;
}

export const ExportXLSX = ({ sheetData }: ExportXLSXProps) => {
	const onDownload = () => {
		if (sheetData.finances.length === 0) {
			toast.error('Não é possível exportar uma planilha vazia!');
			return;
		}

		const data = [['Título', 'Tipo', 'Quantia', 'Data']];
		sheetData.finances.forEach((finance) => {
			data.push([
				finance.title,
				finance.type === 'PROFIT' ? 'Ganho' : 'Despesa',
				finance.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
				finance.date.replaceAll('/', '-'),
			]);
		});

		const sheet = xlsx.utils.aoa_to_sheet(data);
		const workbook = xlsx.utils.book_new();

		xlsx.utils.book_append_sheet(workbook, sheet, sheetData.name.replaceAll('/', '-'));

		const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
		saveAs(new Blob([buffer]), `${sheetData.name.replaceAll('/', '-')}.xlsx`);
	};

	return (
		<button
			onClick={() => onDownload()}
			className='bg-green-700 text-lg hover:bg-green-800 rounded-lg text-white flex items-center gap-x-2 px-4 py-2'
		>
			Exportar <PiMicrosoftExcelLogoFill className='w-8 h-8' />
		</button>
	);
};
