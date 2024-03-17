import { Month, monthNameToMonthNumber } from '@/constants/months';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sheetNameToDate(sheetName: string | null) {
	const sheetDateArr = sheetName?.split('/');
	const sheetMonth = (sheetDateArr ? sheetDateArr[0] : 'Janeiro') as Month;
	const sheetMonthNumber = monthNameToMonthNumber[sheetMonth];
	const sheetYear = sheetDateArr ? sheetDateArr[1] : '2024';

	const sheetDate = new Date(+sheetYear, sheetMonthNumber - 1, 1);

	return sheetDate;
}

export function expenseStringToDate(expenseString: string | undefined) {
	const expenseDateArr = expenseString?.split('/');

	const expenseDay = (Number(expenseDateArr && expenseDateArr[0]) + 1)?.toLocaleString('pt-BR', {
		minimumIntegerDigits: 2,
	});
	//@ts-ignore
	const expenseMonth = monthNameToMonthNumber[expenseDateArr && expenseDateArr[1]]?.toLocaleString('pt-BR', {
		minimumIntegerDigits: 2,
	});
	const expenseYear = Number(expenseDateArr && expenseDateArr[2]);

	const expenseDate = new Date(`${expenseYear}-${expenseMonth}-${expenseDay}`);

	return expenseDate;
}
