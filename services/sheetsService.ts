export const sheetsService = {
	async getUserSheetsAndIsInitialAmountSet() {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return res.json();
	},
	async getSheetById(sheetId: string) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets/${sheetId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return res.json();
	},
	async createSheet(body: { year: number; month: number }) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		return res.json();
	},
	async deleteSheet(sheetId: string) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sheets/${sheetId}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return res.json();
	},
};
