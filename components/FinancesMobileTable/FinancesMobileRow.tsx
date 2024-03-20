import { Finance } from '@prisma/client';

import { ActionsDropdown } from '../FinancesSheet/ActionsDropdown';

export const FinancesMobileRow = ({ finance }: { finance: Finance }) => {
	return (
		<div className='w-full grid grid-cols-2 gap-x-2 p-4 bg-white border-t'>
			<div className='flex flex-col items-start justify-center gap-y-2'>
				<p className='text-sm break-all'>{finance.title}</p>
				<div className='rounded bg-neutral-200 px-2 py-1 text-xs font-semibold'>{finance.date}</div>
			</div>
			<div className='flex flex-col items-end justify-center'>
				<div className='flex flex-col items-end justify-center gap-y-2'>
					<p className='text-red-600 text-sm break-all font-semibold text-end'>
						-{' '}
						{finance.amount.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
					<ActionsDropdown finance={finance} />
				</div>
			</div>
		</div>
	);
};
