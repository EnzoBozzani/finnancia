'use client';

import { Category, Finance, Sheet } from '@prisma/client';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

import { Color, colorMap } from '@/constants/colors';
import { currencyFormat } from '@/lib/utils';

import { ReportAnalysisCard } from './ReportAnalysisCard';

interface SheetWithFinances extends Sheet {
	finances: (Finance & { category?: Category })[];
}

interface ReportProps {
	sheetData: SheetWithFinances;
	mediumAmount: number;
	mediumProfit: number;
	mediumExpense: number;
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
	return (
		<View
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				padding: 10,
				borderBottom: '1px solid rgb(212 212 212)',
				backgroundColor: colorMap[finance.category ? (finance.category.color as Color) : 'transparent'].light,
				fontSize: 12,
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

export const Report = ({ sheetData, mediumAmount, mediumExpense, mediumProfit }: ReportProps) => {
	let currentSheetTotalExpense = 0;
	let currentSheetTotalProfit = 0;

	const categoriesExpense = new Map<string, number>();
	const categoriesProfit = new Map<string, number>();

	sheetData.finances.forEach((finance) => {
		if (finance.type === 'EXPENSE') {
			currentSheetTotalExpense += finance.amount;
		} else {
			currentSheetTotalProfit += finance.amount;
		}

		switch (finance.type) {
			case 'EXPENSE':
				if (finance.category) {
					if (categoriesExpense.has(finance.category.name)) {
						categoriesExpense.set(
							finance.category.name,
							categoriesExpense.get(finance.category.name)! + finance.amount
						);
					} else {
						categoriesExpense.set(finance.category.name, finance.amount);
					}
				} else {
					if (categoriesExpense.has('Sem categoria')) {
						categoriesExpense.set(
							'Sem categoria',
							categoriesExpense.get('Sem categoria')! + finance.amount
						);
					} else {
						categoriesExpense.set('Sem categoria', finance.amount);
					}
				}
				break;
			case 'PROFIT':
				if (finance.category) {
					if (categoriesProfit.has(finance.category.name)) {
						categoriesProfit.set(
							finance.category.name,
							categoriesProfit.get(finance.category.name)! + finance.amount
						);
					} else {
						categoriesProfit.set(finance.category.name, finance.amount);
					}
				} else {
					if (categoriesProfit.has('Sem categoria')) {
						categoriesProfit.set('Sem categoria', categoriesProfit.get('Sem categoria')! + finance.amount);
					} else {
						categoriesProfit.set('Sem categoria', finance.amount);
					}
				}
				break;
		}
	});

	const percentagesExpense = new Map<string, number>();
	const percentagesProfit = new Map<string, number>();

	categoriesExpense.forEach((amount, category) => {
		percentagesExpense.set(category, (amount / currentSheetTotalExpense) * 100);
	});
	categoriesProfit.forEach((amount, category) => {
		percentagesProfit.set(category, (amount / currentSheetTotalProfit) * 100);
	});

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
						marginBottom: 24,
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
						marginHorizontal: 'auto',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 16,
						marginBottom: 24,
					}}
				>
					<ReportAnalysisCard
						currentMonthSheetValue={sheetData.totalAmount}
						textColor='sky'
						medium={mediumAmount}
						title='Saldo'
					/>
					<ReportAnalysisCard
						currentMonthSheetValue={currentSheetTotalProfit}
						textColor='green'
						medium={mediumProfit}
						title='Ganho'
					/>
					<ReportAnalysisCard
						currentMonthSheetValue={currentSheetTotalExpense}
						textColor='red'
						medium={mediumExpense}
						title='Gasto'
					/>
				</View>
				<Text
					style={{
						fontSize: 12,
						textAlign: 'justify',
						marginBottom: 8,
						width: '95%',
						marginHorizontal: 'auto',
					}}
				>
					Os gastos são compostos por:{' '}
					{Array.from(percentagesExpense)
						.map((category) => `${category[0]} (${category[1].toFixed(2)}%)`)
						.join(', ')}
					.
				</Text>
				<Text
					style={{
						fontSize: 12,
						textAlign: 'justify',
						marginBottom: 8,
						width: '95%',
						marginHorizontal: 'auto',
					}}
				>
					Os ganhos são compostos por:{' '}
					{Array.from(percentagesProfit)
						.map((category) => `${category[0]} (${category[1].toFixed(2)}%)`)
						.join(', ')}
					.
				</Text>
			</Page>
			<Page style={styles.page}>
				<View>
					<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
						Finanças
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
						fontSize: 12,
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
