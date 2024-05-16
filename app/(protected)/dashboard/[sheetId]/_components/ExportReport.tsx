'use client';

import { saveAs } from 'file-saver';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { useFormStatus } from 'react-dom';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';
import { PDFViewer, pdf } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AIService } from '@/services/AIService';

import { Report } from './Report';

interface ExportReportProps {
	sheetId: string;
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
						<HiOutlineDocumentReport className='w-8 h-8 sm:mr-2' />
						<p className='hidden sm:block'>Exportar</p>
					</>
				)}
			</Button>
		</div>
	);
};

export const ExportReport = ({ sheetId }: ExportReportProps) => {
	const onDownload = async () => {
		const res = await AIService.getReport(sheetId);

		if (res.error) {
			toast.error('Algo deu errado!');
			return;
		}

		const blob = await pdf(Report({ sheetData: res.sheet, modelReport: res.report })).toBlob();

		saveAs(blob, `${res.sheet.name.replace('/', '-')}.pdf`);

		toast.success('Relatório exportado com sucesso!');
	};

	return (
		<form action={onDownload}>
			<SubmitButton />
		</form>
	);
};
