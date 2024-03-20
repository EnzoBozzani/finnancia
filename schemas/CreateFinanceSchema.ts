import { z } from 'zod';

export const CreateFinanceSchema = z.object({
	date: z.string().max(20),
	title: z.string(),
	amount: z.number().positive(),
	type: z.string().min(6).max(7),
});
