import { Logo } from './Logo';

export const Loader: React.FC = () => {
	return (
		<div className='bg-white rounded-full p-4 shadow-lg w-fit flex items-center justify-center'>
			<div className='w-16 h-16 border-4 border-dashed border-green-700 rounded-full animate-spin p-4 flex justify-center items-center'>
				<Logo
					hideFully
					className='w-fit'
					logoColor='text-green-700'
				/>
			</div>
		</div>
	);
};
