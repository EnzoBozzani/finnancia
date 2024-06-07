import { z } from 'zod';

export const CreateCategorySchema = z.object({
	name: z.string().min(1).max(60),
	color: z.enum([
		'transparent',
		'red',
		'orange',
		'amber',
		'yellow',
		'lime',
		'green',
		'emerald',
		'teal',
		'cyan',
		'sky',
		'blue',
		'indigo',
		'violet',
		'purple',
		'fuchsia',
		'pink',
		'rose',
	]),
});
