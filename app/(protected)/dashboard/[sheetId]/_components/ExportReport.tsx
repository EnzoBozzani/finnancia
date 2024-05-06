'use client';

import { useState } from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { Finance, Sheet } from '@prisma/client';
import { useFormStatus } from 'react-dom';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';
import { cn, currencyFormat } from '@/lib/utils';
import { AIService } from '@/services/AIService';

interface ExportReportProps {
	sheetId: string;
}

interface SheetWithFinances extends Sheet {
	finances: Finance[];
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
	const [isLoading, setIsLoading] = useState(false);
	const [sheetData, setSheetData] = useState<SheetWithFinances | null>(null);

	const onDownload = async () => {
		setIsLoading(true);
		const res = await AIService.getReport(sheetId);

		if (res.error) {
			toast.error('Algo deu errado!');
			return;
		}

		setSheetData(res.sheet);
		setIsLoading(false);
	};

	return (
		<form action={onDownload}>
			<SubmitButton />
			{isLoading || !sheetData ? (
				<>carregando</>
			) : (
				<PDFViewer>
					<Document>
						<Page style={styles.page}>
							<View style={{ width: '100%' }}>
								<Text style={styles.title}>{sheetData.name}</Text>
							</View>
							<View style={styles.row}>
								<View style={styles.cell}>
									<Text>Título</Text>
								</View>
								<View style={styles.cell}>
									<Text>Quantia</Text>
								</View>
								<View style={styles.cell}>
									<Text>Data</Text>
								</View>
							</View>
							{sheetData.finances.map((finance) => (
								<SheetRow
									key={finance.id}
									finance={finance}
								/>
							))}
						</Page>
					</Document>
				</PDFViewer>
			)}
		</form>
	);
};

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		padding: 10,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 32,
	},
	row: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottom: '1px solid rgb(212 212 212)',
	},
	cell: {
		width: '33.33%',
		textAlign: 'center',
	},
});

const SheetRow = ({ finance }: { finance: Finance }) => (
	<View style={styles.row}>
		<View style={styles.cell}>
			<Text>{finance.title}</Text>
		</View>
		<View style={styles.cell}>
			<Text
				style={{
					fontWeight: 'bold',
					color: finance.type === 'PROFIT' ? 'rgb(21 128 61)' : 'rgb(185 28 28)',
				}}
			>
				{finance.type === 'PROFIT' ? '+ ' : '- '}
				{currencyFormat(finance.amount)}
			</Text>
		</View>
		<View style={styles.cell}>
			<Text>{finance.date}</Text>
		</View>
	</View>
);
