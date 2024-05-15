export const usersService = {
	async setInitialAmount(amount: number) {
		const res = await fetch('/api/user/initialAmount', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount }),
		});

		return res.json();
	},
	async includeAIAnalysis(currentStatus: boolean) {
		const res = await fetch('/api/user/includeAIAnalysis', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ currentStatus }),
		});

		return res.json();
	},
};
