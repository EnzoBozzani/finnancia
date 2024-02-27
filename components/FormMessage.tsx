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
		<div
			className={cn(
				'border-2  p-4 rounded-lg flex items-center justify-between',
				type === 'success' ? 'border-green-700 bg-green-300' : 'border-red-700 bg-red-300',
				className
			)}
		>
			{message}
			<Cross1Icon
				className='w-5 h-5 cursor-pointer'
				onClick={() => setMessage(null)}
			/>
		</div>
	);
};
