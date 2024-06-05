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
};
