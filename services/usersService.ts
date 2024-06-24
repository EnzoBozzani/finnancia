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

	async sendMessage(message: string) {
		const res = await fetch('/api/user/help', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message }),
		});

		return res.json();
	},

	async changeAmount(amount: number) {
		const res = await fetch('/api/user/amount', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount }),
		});

		return res.json();
	},
};
