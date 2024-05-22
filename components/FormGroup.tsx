import { cn } from '@/lib/utils';

import { Input } from './ui/input';
import { Label } from './ui/label';

interface FormGroupProps {
	label: string;
	id: string;
	className?: string;
	placeholder?: string;
	type?: 'email' | 'password';
	mask?: string;
	initialValue?: string;
	disabled?: boolean;
}

export const FormGroup = ({
	label,
	id,
	className,
	placeholder,
	type,
	mask,
	initialValue,
	disabled,
}: FormGroupProps) => {
	return (
		<div className={cn('space-y-3', className)}>
			<div>
				<Label
					htmlFor={id}
					className='text-lg'
				>
					{label}
				</Label>
				{type === 'password' && <p className='text-black/50 text-xs'>(Min. 6)</p>}
			</div>
			<Input
				id={id}
				name={id}
				className='focus:border-green-400'
				placeholder={placeholder || ''}
				type={type || 'text'}
				min={type === 'password' ? 6 : 4}
				data-mask={mask}
				maxLength={id === 'amount' ? 25 : 50}
				defaultValue={initialValue}
				disabled={disabled}
			/>
		</div>
	);
};
