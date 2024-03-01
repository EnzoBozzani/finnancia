interface ChildrenProps {
	children: React.ReactNode;
}

export const FeatureArticle = ({ children }: ChildrenProps) => {
	return (
		<article className='mx-auto w-[90%] p-4 space-y-3 flex flex-col justify-center items-center md:block'>
			{children}
		</article>
	);
};

FeatureArticle.Icon = function ({ children }: ChildrenProps) {
	return <div className='w-fit text-green-600'>{children}</div>;
};

FeatureArticle.Title = function ({ children }: ChildrenProps) {
	return <h3 className='text-xl font-semibold text-center md:text-justify'>{children}</h3>;
};

FeatureArticle.Text = function ({ children }: ChildrenProps) {
	return <p className='text-neutral-600 text-sm text-center md:text-justify'>{children}</p>;
};
