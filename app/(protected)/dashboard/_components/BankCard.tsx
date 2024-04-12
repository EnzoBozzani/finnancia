import Image from 'next/image';

interface BankCardProps {
	bankName: string;
	imageSrc: string;
	//action: Function
}

export const BankCard = ({ bankName, imageSrc }: BankCardProps) => {
	return (
		<div className='w-full md:w-[45%] flex items-center justify-center'>
			<Image
				alt={`${bankName} logo`}
				className='w-[300px] h-[300px]'
				src={imageSrc}
				width={300}
				height={300}
			/>
		</div>
	);
};
