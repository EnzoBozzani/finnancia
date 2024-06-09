'use client';

import { Category, Finance, Sheet } from '@prisma/client';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

import { Color } from '@/constants/colors';
import { currencyFormat } from '@/lib/utils';
import { ReportAnalysisCard } from './ReportAnalysisCard';

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

interface ReportProps {
	sheetData: SheetWithFinances;
}

Font.register({
	family: 'Montserrat',
	src: '/Montserrat/static/Montserrat-Medium.ttf',
	fontWeight: 'normal',
	fonts: [
		{
			src: '/Montserrat/static/Montserrat-Bold.ttf',
			fontWeight: 'bold',
		},
		{
			src: '/Montserrat/static/Montserrat-Medium.ttf',
			fontWeight: 'normal',
		},
	],
});

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		padding: 10,
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
	},
	cell: {
		width: '33.33%',
		textAlign: 'center',
	},
});

const SheetRow = ({ finance }: { finance: Finance & { category?: Category } }) => {
	const bgMap: { [key in Color]: string } = {
		transparent: 'transparent',
		red: '#fee2e2',
		orange: '#ffedd5',
		amber: '#fef3c7',
		yellow: '#fef9c3',
		lime: '#ecfccb',
		green: '#dcfce7',
		emerald: '#d1fae5',
		teal: '#ccfbf1',
		cyan: '#cffafe',
		sky: '#e0f2fe',
		blue: '#dbeafe',
		indigo: '#e0e7ff',
		violet: '#ede9fe',
		purple: '#f3e8ff',
		fuchsia: '#fae8ff',
		pink: '#fce7f3',
		rose: '#ffe4e6',
	};

	return (
		<View
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				padding: 10,
				borderBottom: '1px solid rgb(212 212 212)',
				backgroundColor: bgMap[finance.category ? (finance.category.color as Color) : 'transparent'],
			}}
		>
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
				<Text>{finance.category ? finance.category.name : '-'}</Text>
			</View>
			<View style={styles.cell}>
				<Text>{finance.date}</Text>
			</View>
		</View>
	);
};

export const Report = ({ sheetData }: ReportProps) => {
	return (
		<Document>
			<Page style={styles.page}>
				<View
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Image
						src={'/logo.png'}
						style={{
							width: 50,
							height: 50,
						}}
					/>
					<Text style={styles.title}>{sheetData.name}</Text>
					<View></View>
				</View>
				<View
					style={{
						width: '95%',
						marginHorizontal: 0,
						display: 'flex',
						flexDirection: 'column',
						gap: 16,
						marginBottom: 32,
					}}
				>
					<ReportAnalysisCard
						currentMonthSheetValue={sheetData.totalAmount}
						textColor='sky'
						medium={50}
						title='Saldo'
					/>
					<ReportAnalysisCard
						currentMonthSheetValue={sheetData.totalAmount}
						textColor='sky'
						medium={50}
						title='Saldo'
					/>
					<ReportAnalysisCard
						currentMonthSheetValue={sheetData.totalAmount}
						textColor='sky'
						medium={50}
						title='Saldo'
					/>
				</View>
				<View>
					<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Finanças</Text>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 16,
							fontWeight: 'bold',
							color: sheetData.totalAmount >= 0 ? 'rgb(21 128 61)' : 'rgb(185 28 28)',
						}}
					>
						{currencyFormat(sheetData.totalAmount)}
					</Text>
				</View>
				<View
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						padding: 10,
						borderBottom: '1px solid rgb(212 212 212)',
					}}
				>
					<View style={styles.cell}>
						<Text>Título</Text>
					</View>
					<View style={styles.cell}>
						<Text>Quantia</Text>
					</View>
					<View style={styles.cell}>
						<Text>Categoria</Text>
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
	);
};
