import { z } from 'zod';

export const AIPromptSchema = z.object({
	prompt: z.string(),
});
