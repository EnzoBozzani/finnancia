import { colors } from '@/constants/colors';
import { z } from 'zod';

export const CreateCategorySchema = z.object({
	name: z.string().min(3).max(60),
	color: z
		.enum([
			'#fecaca',
			'#fed7aa',
			'#fde68a',
			'#fef08a',
			'#d9f99d',
			'#bbf7d0',
			'#a7f3d0',
			'#99f6e4',
			'#a5f3fc',
			'#bae6fd',
			'#bfdbfe',
			'#c7d2fe',
			'#ddd6fe',
			'#e9d5ff',
			'#f5d0fe',
			'#fbcfe8',
			'#fecdd3',
		])
		.optional(),
});
