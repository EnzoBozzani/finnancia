export const sheetsService = {
	async getUserSheets() {
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
};
