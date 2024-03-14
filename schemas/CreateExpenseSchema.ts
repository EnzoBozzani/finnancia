import { z } from 'zod';

export const CreateExpenseSchema = z.object({
	date: z.string().max(20),
	title: z.string(),
	amount: z.number().positive(),
});
