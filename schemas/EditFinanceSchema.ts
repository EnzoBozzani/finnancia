import { z } from 'zod';

export const EditFinanceSchema = z.object({
	date: z.string().max(20).optional(),
	title: z.string().optional(),
	amount: z.number().positive().optional(),
});
