interface CreateExpenseData {
	title: string;
	amount: number;
	date: string;
	sheetId: string;
}

export const expensesService = {
	async createExpense({ title, amount, date, sheetId }: CreateExpenseData) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets/${sheetId}/expense`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
			body: JSON.stringify({ title, amount, date, sheetId }),
		});

		return res.json();
	},
};
