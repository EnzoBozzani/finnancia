import { z } from 'zod';

export const EditCategorySchema = z.object({
	name: z.string().min(1).max(60).optional(),
	color: z
		.enum([
			'null',
			'#fee2e2',
			'#ffedd5',
			'#fef3c7',
			'#fef9c3',
			'#ecfccb',
			'#dcfce7',
			'#d1fae5',
			'#ccfbf1',
			'#cffafe',
			'#e0f2fe',
			'#dbeafe',
			'#e0e7ff',
			'#ede9fe',
			'#f3e8ff',
			'#fae8ff',
			'#fce7f3',
			'#ffe4e6',
		])
		.optional(),
});
