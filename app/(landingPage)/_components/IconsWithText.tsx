import { IoStatsChart } from 'react-icons/io5';
import { MdOutlineManageSearch } from 'react-icons/md';
import { SiCircuitverse } from 'react-icons/si';

export const IconsWithText = () => {
	return (
		<article className='px-12 w-full flex items-start md:items-center justify-start md:justify-center gap-x-12 gap-y-6 mt-12 md:mt-24 pb-12 flex-col md:flex-row'>
			<div className='md:hidden mx-auto space-y-6'>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<MdOutlineManageSearch className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Gestão simples e prática</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<SiCircuitverse className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Auxílio de IA no controle financeiro</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
						<IoStatsChart className='w-8 h-8 text-green-700' />
					</div>
					<p className='text-sm'>Análises completas de seus dados</p>
				</div>
			</div>
			<div className='hidden md:flex items-center gap-x-2'>
				<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
					<MdOutlineManageSearch className='w-8 h-8 text-green-700' />
				</div>
				<p className='text-sm'>Gestão simples e prática</p>
			</div>
			<div className='hidden md:flex items-center gap-x-2'>
				<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
					<SiCircuitverse className='w-8 h-8 text-green-700' />
				</div>
				<p className='text-sm'>Auxílio de IA no controle financeiro</p>
			</div>
			<div className='hidden md:flex items-center gap-x-2'>
				<div className='p-2 rounded-full bg-green-200 border border-neutral-200'>
					<IoStatsChart className='w-8 h-8 text-green-700' />
				</div>
				<p className='text-sm'>Análises completas de seus dados</p>
			</div>
		</article>
	);
};
