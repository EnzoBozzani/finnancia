import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { $Enums, Finance, Sheet } from '@prisma/client';

import { Month, monthNameToMonthNumber, months } from '@/constants/months';

type SheetMonth = {
	name: string;
	id: string;
	order: number;
};

type Year = {
	order: number;
	sheets: SheetMonth[];
};

interface SheetWithFinances extends Sheet {
	finances: Finance[];
}

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

export function dateToSheetName(date: Date) {
	const monthNumber = date.getMonth();

	const monthName = months[monthNumber];

	return `${monthName}/${date.getFullYear()}`;
}

export function financeStringToDate(financeString: string | undefined) {
	if (!financeString) return new Date(1970, 0, 1);

	const financeDateArr = financeString.split('/');

	const financeDay = Number(financeDateArr[0]);
	const financeMonth = Number(monthNameToMonthNumber[financeDateArr[1] as Month]);
	const financeYear = Number(financeDateArr[2]);

	const financeDate = new Date(financeYear, financeMonth - 1, financeDay);

	return financeDate;
}

export function orderYearsForSelectSheet(res: any[]) {
	const years = new Set<number>();

	res.forEach((sheet: SheetMonth) => {
		const year = sheet.name.split('/')[1];
		years.add(Number(year));
	});

	const orderedYears: Year[] = [];

	years.forEach((year: number) =>
		orderedYears.push({
			order: year,
			sheets: [],
		})
	);

	orderedYears.sort((a, b) => b.order - a.order);

	res.forEach((sheet: SheetMonth) => {
		const yearNumber = Number(sheet.name.split('/')[1]);
		const yearObject = orderedYears.find((year) => year.order === yearNumber);
		yearObject?.sheets.push({ id: sheet.id, name: sheet.name, order: sheet.order });
	});

	orderedYears.forEach((year) => {
		year.sheets.sort((a, b) => b.order - a.order);
	});

	return orderedYears;
}

export function getSheetTimeSinceJanuary1970(sheet: { order: number; name: string }) {
	return new Date(`${sheet.name.split('/')[1]}-${sheet.order}-01`).valueOf();
}

export const currencyFormat = (value: number) =>
	Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 }).format(value);

export function splitFinancesInGroupsOf8(sheetData: SheetWithFinances) {
	let idCounter = 0;
	while (sheetData.finances.length % 8 !== 0) {
		sheetData.finances.push({
			id: `fake-id-${idCounter}`,
			amount: 0,
			date: '',
			order: 0,
			sheetId: sheetData.id,
			title: '',
			type: 'EXPENSE',
		});
		idCounter++;
	}

	const numberOfGroupsOf8 = Math.ceil(sheetData.finances.length / 8);
	const financesInGroupsOf8: Finance[][] = [];

	let previous = 0;

	for (let i = 1; i <= numberOfGroupsOf8; i++) {
		financesInGroupsOf8.push(
			sheetData.finances.slice(previous, i * 8 > sheetData.finances.length ? sheetData.finances.length : i * 8)
		);
		previous = i * 8;
	}

	return { financesInGroupsOf8, numberOfGroupsOf8 };
}

export function filterSheetData(
	sheets: ({
		finances: {
			amount: number;
			type: $Enums.FinanceType;
		}[];
	} & {
		id: string;
		name: string;
		userId: string;
		totalAmount: number;
		order: number;
	})[]
) {
	const currentMonthSheetName = dateToSheetName(new Date());

	let totalAmountInAllSheets = 0;
	let totalProfitInAllSheets = 0;
	let totalExpenseInAllSheets = 0;

	let currentMonthSheetTotalAmount = 0;
	let currentMonthSheetTotalProfit = 0;
	let currentMonthSheetTotalExpense = 0;

	let positiveSheets = 0;
	let neutralSheets = 0;
	let negativeSheets = 0;

	for (let i = 0; i < sheets.length; i++) {
		totalAmountInAllSheets += sheets[i].totalAmount;

		sheets[i].totalAmount > 0 ? positiveSheets++ : sheets[i].totalAmount === 0 ? neutralSheets++ : negativeSheets++;

		if (sheets[i].name === currentMonthSheetName) {
			currentMonthSheetTotalAmount = sheets[i].totalAmount;
		}

		for (let j = 0; j < sheets[i].finances.length; j++) {
			sheets[i].finances[j].type === 'PROFIT'
				? (totalProfitInAllSheets += sheets[i].finances[j].amount)
				: (totalExpenseInAllSheets += sheets[i].finances[j].amount);

			if (sheets[i].name === currentMonthSheetName) {
				sheets[i].finances[j].type === 'PROFIT'
					? (currentMonthSheetTotalProfit += sheets[i].finances[j].amount)
					: (currentMonthSheetTotalExpense += sheets[i].finances[j].amount);
			}
		}
	}

	let mediumAmount = totalAmountInAllSheets / (sheets.length || 1);
	let mediumProfit = totalProfitInAllSheets / (sheets.length || 1);
	let mediumExpense = totalExpenseInAllSheets / (sheets.length || 1);

	const lastSixSheets = sheets
		.filter((sheet) => getSheetTimeSinceJanuary1970(sheet) < new Date().valueOf())
		.sort((sheetA, sheetB) => getSheetTimeSinceJanuary1970(sheetA) - getSheetTimeSinceJanuary1970(sheetB))
		.slice(-6);

	const sheetsNames: string[] = [];
	const sheetsTotalExpenses: number[] = [];
	const sheetsTotalProfit: number[] = [];
	const sheetsTotalAmount: number[] = [];

	lastSixSheets.forEach((sheet) => {
		sheetsNames.push(sheet.name);
		sheetsTotalExpenses.push(
			sheet.finances.reduce(
				(current, finance) => (finance.type === 'EXPENSE' ? current + finance.amount : current),
				0
			)
		);
		sheetsTotalProfit.push(
			sheet.finances.reduce(
				(current, finance) => (finance.type === 'PROFIT' ? current + finance.amount : current),
				0
			)
		);
		sheetsTotalAmount.push(sheet.totalAmount);
	});

	return {
		sheetsNames,
		sheetsTotalExpenses,
		sheetsTotalProfit,
		sheetsTotalAmount,
		lastSixSheets,
		mediumAmount,
		mediumExpense,
		mediumProfit,
		currentMonthSheetTotalAmount,
		currentMonthSheetTotalExpense,
		currentMonthSheetTotalProfit,
		positiveSheets,
		negativeSheets,
		neutralSheets,
	};
}

export function dayExistsInMonth(financeDate: string | undefined) {
	if (!financeDate) return false;

	const dateArr = financeDate.split('/');

	const day = Number(dateArr[0]);
	const monthNumber = monthNameToMonthNumber[dateArr[1] as Month];
	const year = Number(dateArr[2]);

	if (day > 30 && (monthNumber === 4 || monthNumber === 6 || monthNumber === 9 || monthNumber === 11)) {
		return false;
	}

	if (monthNumber === 2) {
		const isLeapYear =
			(year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0);

		if (!isLeapYear && day > 28) {
			return false;
		}

		if (isLeapYear && day > 29) {
			return false;
		}
	}

	return true;
}

export function returnFormattedStringBasedOnDate(created: Date) {
	const createdAt = new Date(created);
	const day = createdAt.getDate();
	const month = createdAt.getMonth() + 1;
	const year = createdAt.getFullYear();

	const hour = createdAt.getHours();
	const minute = createdAt.getMinutes();
	const second = createdAt.getSeconds();

	return `${day.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}/${month.toLocaleString('pt-BR', {
		minimumIntegerDigits: 2,
	})}/${year} às ${hour.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}:${minute.toLocaleString('pt-BR', {
		minimumIntegerDigits: 2,
	})}:${second.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`;
}
