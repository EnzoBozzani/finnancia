export const sheetsService = {
	async getUserSheets() {
		const res = await fetch('/api/sheets', {
			method: 'GET',
		});

		return res.json();
	},
};
