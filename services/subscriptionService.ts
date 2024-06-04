export const subscriptionService = {
	async getStripeUrl() {
		const res = await fetch('/api/subscription', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return res.json();
	},
};
