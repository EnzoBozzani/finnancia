'use client';

import { toast } from 'sonner';
import Image from 'next/image';
import { useTransition } from 'react';

import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { useProModal } from '@/hooks/useProModal';
import { subscriptionService } from '@/services/subscriptionService';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VscLoading } from 'react-icons/vsc';

export const ProModal = () => {
	const [pending, startTransition] = useTransition();

	const isDark = useIsDarkTheme();

	const isOpen = useProModal((state) => state.isOpen);
	const onClose = useProModal((state) => state.onClose);
	const text = useProModal((state) => state.text);

	return (
		<>
			<Dialog
				open={true}
				defaultOpen
				onOpenChange={onClose}
			>
				<DialogContent
					className={cn(
						'sm:max-w-[425px] p-6 border-none outline-none',
						isDark ? 'bg-neutral-900 text-white' : 'bg-white'
					)}
				>
					<div className='w-full flex items-center justify-center mb-8'>
						<Image
							src={'/pro.svg'}
							alt='Pro'
							height={120}
							width={120}
							className='w-full'
						/>
					</div>
					<h3 className='text-center font-black text-xl uppercase'>Assine Finnancia Pro agora!</h3>
					<p>{text}</p>
					<ul className='space-y-3 text-sm mb-6'>
						<li className='flex items-center gap-x-2'>
							<div
								className={cn(
									'w-[5px] h-[5px] rounded-full bg-green-500',
									isDark ? 'bg-neutral-100' : 'bg-neutral-900'
								)}
							/>
							<span>Crie até 1000 finanças por mês</span>
						</li>
						<li className='flex items-center gap-x-2'>
							<div
								className={cn(
									'w-[5px] h-[5px] rounded-full bg-green-500',
									isDark ? 'bg-neutral-100' : 'bg-neutral-900'
								)}
							/>
							<span>Acesse todas as cores de categoria disponíveis</span>
						</li>
					</ul>
					<div className='flex items-center justify-center'>
						<Button
							size={'lg'}
							className='w-[200px] flex items-center text-lg py-6'
							disabled={pending}
							onClick={() => {
								startTransition(() => {
									subscriptionService
										.getStripeUrl()
										.then((res) => {
											if (res.url) {
												window.location.href = res.url;
											}
										})
										.catch(() => toast.error('Algo deu errado... Tente novamente mais tarde!'));
								});
							}}
						>
							{pending ? (
								<>
									<VscLoading className='w-8 h-8 animate-spin mr-2' />
									Carregando
								</>
							) : (
								<>Inscreva-se</>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
