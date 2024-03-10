import { cn } from '@/lib/utils';
import { Cross1Icon } from '@radix-ui/react-icons';

interface FormMessageProps {
	type: 'success' | 'error';
	message: string | null;
	className?: string;
	setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormMessage = ({ type, message, className, setMessage }: FormMessageProps) => {
	if (message === null) return null;

	return (
		<p className={cn('text-center py-2', type === 'success' ? 'text-green-400' : 'text-red-400', className)}>
			{message}
		</p>
	);
};
