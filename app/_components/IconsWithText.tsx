import { CiCreditCard1 } from 'react-icons/ci';
import { MdCalendarMonth, MdOutlineManageSearch } from 'react-icons/md';

export const IconsWithText = () => {
	return (
		<article className='px-12 w-full flex items-start md:items-center justify-start md:justify-center gap-x-12 gap-y-6 mt-12 md:mt-24 mb-12 flex-col md:flex-row'>
			<div className='md:hidden mx-auto space-y-6'>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<MdOutlineManageSearch className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Fácil pesquisa e organização</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<CiCreditCard1 className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Organize suas finanças</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<MdCalendarMonth className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Controle gastos mensais</p>
				</div>
			</div>
			<div className='hidden md:flex items-center gap-x-2'>
				<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
					<MdOutlineManageSearch className='w-8 h-8 text-green-700' />
				</div>
				<p className='text-sm'>Fácil pesquisa e organização</p>
			</div>
			<div className='hidden md:flex items-center gap-x-2'>
				<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
					<CiCreditCard1 className='w-8 h-8 text-green-700' />
				</div>
				<p className='text-sm'>Organize suas finanças</p>
			</div>
			<div className='hidden md:flex items-center gap-x-2'>
				<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
					<MdCalendarMonth className='w-8 h-8 text-green-700' />
				</div>
				<p className='text-sm'>Controle gastos mensais</p>
			</div>
		</article>
	);
};
