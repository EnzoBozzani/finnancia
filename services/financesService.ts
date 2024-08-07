import { FinanceType } from '@prisma/client';

interface CreateFinanceData {
	title: string;
	amount: number;
	date: string;
	sheetId: string;
	type: FinanceType;
	categoryId: string;
}

interface UpdateFinanceData {
	title?: string;
	amount?: number;
	date?: string;
	type?: 'EXPENSE' | 'PROFIT';
	categoryId?: string;
}

export const financesService = {
	async createFinance({ title, amount, date, type, sheetId, categoryId }: CreateFinanceData) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets/${sheetId}/finance`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
			body: JSON.stringify({ title, amount, date, sheetId, type, categoryId }),
		});

		return res.json();
	},

	async deleteFinance(financeId: string) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/finances/${financeId}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
		});

		return res.json();
	},

	async editFinance(financeId: string, updateValues: UpdateFinanceData) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/finances/${financeId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
			body: JSON.stringify(updateValues),
		});

		return res.json();
	},

	async getPaginatedFinances(sheetId: string, page: number, title: string) {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets/${sheetId}/finance?page=${page}&title=${title}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);

		return res.json();
	},

	async getFinancesWithCategories(sheetId: string) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/finances/categories/${sheetId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return res.json();
	},
};
