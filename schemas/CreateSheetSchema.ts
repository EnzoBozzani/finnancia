import { z } from 'zod';

const currentDate = new Date();

const currentYear = currentDate.getFullYear();

export const CreateSheetSchema = z.object({
	month: z.number().int().gte(1, { message: 'gte' }).lte(12, { message: 'gte' }),
	year: z
		.number()
		.int()
		.gte(2010, { message: 'lte' })
		.lte(currentYear + 2, { message: 'gte' }),
});
