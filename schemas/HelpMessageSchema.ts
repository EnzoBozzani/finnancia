import { z } from 'zod';

export const HelpMessageSchema = z.object({
	message: z.string(),
});
