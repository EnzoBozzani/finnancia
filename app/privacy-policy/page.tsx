import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown';

import { Logo } from '@/components/Logo';

const PrivacyPolicyPage = () => {
	return (
		<div className='w-full min-h-screen bg-neutral-100'>
			<header className='bg-green-100 w-full'>
				<div className='mx-auto max-w-screen-xl px-4 py-4 flex items-center justify-center'>
					<Logo className='w-fit' />
				</div>
			</header>
			<Markdown
				className='w-[90%] mx-auto p-4 max-w-screen-xl'
				rehypePlugins={[rehypeRaw]}
			>
				Oops... Algo deu errado
			</Markdown>
		</div>
	);
};

export default PrivacyPolicyPage;
