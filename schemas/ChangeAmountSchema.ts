import { z } from 'zod';

export const ChangeAmountSchema = z.object({
	amount: z.number(),
});
