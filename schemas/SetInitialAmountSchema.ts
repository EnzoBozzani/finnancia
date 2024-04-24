import { z } from 'zod';

export const SetInitialAmountSchema = z.object({
	amount: z.number(),
});
