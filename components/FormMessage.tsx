import { cn } from '@/lib/utils';

interface FormMessageProps {
	type: 'success' | 'error';
	message: string | null;
	className?: string;
}

export const FormMessage = ({ type, message, className }: FormMessageProps) => {
	if (message === null) return null;

	return (
		<p className={cn('text-center py-2', type === 'success' ? 'text-green-400' : 'text-red-400', className)}>
			{message}
		</p>
	);
};
