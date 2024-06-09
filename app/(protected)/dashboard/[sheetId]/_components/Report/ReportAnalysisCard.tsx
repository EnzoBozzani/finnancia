import { View, Text } from '@react-pdf/renderer';

import { currencyFormat } from '@/lib/utils';

interface ReportAnalysisCardProps {
	title: string;
	medium: number;
	textColor: 'green' | 'red' | 'sky' | 'neutral';
	currentMonthSheetValue: number;
}

export const ReportAnalysisCard = ({ currentMonthSheetValue, medium, textColor, title }: ReportAnalysisCardProps) => {
	const diff = medium - currentMonthSheetValue;
	const increasedOrDecreased = diff > 0 ? 'decreased' : diff === 0 ? 'equal' : 'increased';

	const textColorMap: { [key in 'green' | 'red' | 'sky' | 'neutral']: string } = {
		green: '#22c55e',
		red: '#ef4444',
		sky: '#0ea5e9',
		neutral: '#737373',
	};

	const porcentageColor =
		increasedOrDecreased === 'equal'
			? textColorMap.neutral
			: increasedOrDecreased === 'decreased'
			? textColor === 'red'
				? textColorMap.green
				: textColorMap.red
			: textColor === 'red'
			? textColorMap.red
			: textColorMap.green;

	const porcentage = Math.abs((100 * diff) / (medium || 1));

	return (
		<View
			style={{
				width: '100%',
				border: '1px solid rgb(212 212 212)',
				backgroundColor: 'rgb(245 245 245)',
				borderRadius: 12,
				padding: 16,
				color:
					textColor === 'green'
						? '#15803d'
						: textColor === 'red'
						? '#b91c1c'
						: textColor === 'sky'
						? '#0369a1'
						: '#404040',
			}}
		>
			<View
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					gap: 8,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						color: '#000',
						textTransform: 'uppercase',
					}}
				>
					{title}
				</Text>
				<Text
					style={{
						color: 'rgb(115 115 115)',
						fontSize: 14,
					}}
				>
					(esse mês)
				</Text>
			</View>
			<View
				style={{
					fontSize: 60,
					textAlign: 'left',
					fontWeight: 'bold',
					marginVertical: 32,
				}}
			>
				<Text>{currencyFormat(currentMonthSheetValue)}</Text>
			</View>
			<View
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 16,
					marginVertical: 32,
				}}
			>
				<View
					style={{
						display: 'flex',
						alignItems: 'center',
						color: porcentageColor,
					}}
				>
					{porcentageColor === textColorMap.green ? (
						textColor === 'red' ? (
							<Text>-</Text>
						) : (
							<Text>+</Text>
						)
					) : porcentageColor === textColorMap.red ? (
						textColor === 'red' ? (
							<Text>+</Text>
						) : (
							<Text>-</Text>
						)
					) : null}
					<Text
						style={{
							marginRight: 8,
						}}
					>
						{porcentage.toLocaleString('pt-BR', {
							maximumFractionDigits: 2,
						})}
						%
					</Text>
					<Text
						style={{
							color: '#000',
						}}
					>
						vs média mensal
					</Text>
				</View>
				<View
					style={{
						fontSize: 14,
						color: 'rgb(115 115 115)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							textAlign: 'center',
							color: '#000',
						}}
					>
						{currencyFormat(medium)}
					</Text>
					<Text style={{ textAlign: 'center' }}>(média mensal)</Text>
				</View>
			</View>
		</View>
	);
};
