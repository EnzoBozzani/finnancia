import { z } from 'zod';

export const includeAIAnalysis = z.object({
	currentStatus: z.boolean(),
});
