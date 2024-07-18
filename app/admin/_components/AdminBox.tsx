interface AdminBoxProps {
	title: string;
	data: number;
}

export const AdminBox = ({ title, data }: AdminBoxProps) => {
	return (
		<div className='w-full border border-neutral-400 rounded-xl bg-neutral-200 p-8 space-y-4'>
			<h3 className='text-xl md:text-2xl font-bold uppercase text-center md:text-start'>{title}</h3>
			<h1 className='text-6xl md:text-8xl font-bold uppercase text-center md:text-start'>{data}</h1>
		</div>
	);
};
