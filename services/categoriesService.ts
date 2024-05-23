import { Color } from '@/constants/colors';

export const categoriesService = {
	async createCategory({ name, color }: { name: string; color: Color }) {
		const res = await fetch('/api/categories', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
			body: JSON.stringify({ name, color }),
		});

		return res.json();
	},
	async getCategories() {
		const res = await fetch('/api/categories', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
		});

		return res.json();
	},
	async editCategory(id: string, { name, color }: { name: string; color: Color }) {
		const res = await fetch(`/api/categories/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
			body: JSON.stringify({ name, color }),
		});

		return res.json();
	},
	async deleteCategory(id: string) {
		const res = await fetch(`/api/categories/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Conten-Type': 'application/json',
			},
		});

		return res.json();
	},
};
