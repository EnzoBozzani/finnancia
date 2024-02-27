import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FormGroupProps {
	label: string;
	id: string;
	className?: string;
}

export const FormGroup = ({ label, id, className }: FormGroupProps) => {
	return (
		<div className={cn('space-y-3', className)}>
			<Label
				htmlFor={id}
				className='text-lg'
			>
				{label}
			</Label>
			<Input
				id={id}
				name={id}
				className='focus:border-green-400'
			/>
		</div>
	);
};
