export const AIService = {
	async getChat(prompt: string) {
		const res = await fetch(`/api/ai`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
			body: JSON.stringify({ prompt }),
		});

		return res.json();
	},
	async getReport(sheetId: string) {
		const res = await fetch(`/api/ai/report/${sheetId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
		});

		return res.json();
	},
};
