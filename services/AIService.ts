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
};
