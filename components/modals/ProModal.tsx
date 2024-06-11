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

	const BulletPoint = () => (
		<div
			className={cn('w-[5px] h-[5px] rounded-full bg-green-500', isDark ? 'bg-neutral-100' : 'bg-neutral-900')}
		/>
	);

	return (
		<>
			<Dialog
				open={isOpen}
				defaultOpen
				onOpenChange={onClose}
			>
				<DialogContent
					className={cn(
						'sm:max-w-[425px] p-6 border-none outline-none',
						isDark ? 'bg-neutral-900 text-white' : 'bg-white'
					)}
				>
					<div className='lg:flex hidden w-full items-center justify-center'>
						<Image
							src={'/pro.svg'}
							alt='Pro'
							height={100}
							width={100}
							className='w-[250px] h-auto'
						/>
					</div>
					<h3 className='text-center font-black text-lg uppercase mt-4'>
						Dê um upgrade no seu controle financeiro com Finnancia Pro!
					</h3>
					<p className='text-xs text-neutral-500 text-justify'>{text}</p>
					<ul className='space-y-2 text-xs mb-6 pl-4'>
						<li className='flex items-center gap-x-2'>
							<BulletPoint />
							<span>Adicione quantas finanças quiser, sem limites</span>
						</li>
						<li className='flex items-center gap-x-2'>
							<BulletPoint />
							<span>Use todas as cores de categoria disponíveis</span>
						</li>
						<li className='flex items-center gap-x-2'>
							<BulletPoint />
							<span>Exporte quantos relatórios personalizados quiser</span>
						</li>
						<li className='flex items-center gap-x-2'>
							<BulletPoint />
							<span>Converse ilimitadamente com a Nanci</span>
						</li>
					</ul>
					<div className='flex items-center justify-center'>
						<Button
							size={'lg'}
							className='w-[200px] flex items-center text-lg py-6'
							disabled={pending}
							onClick={() => {
								startTransition(async () => {
									const res = await subscriptionService.getStripeUrl();

									if (res.error) {
										toast.error('Algo deu errado... Tente novamente mais tarde!');
										return;
									}

									window.location.href = res.url;
								});
							}}
						>
							{pending ? (
								<>
									<VscLoading className='w-8 h-8 animate-spin mr-2' />
									Carregando
								</>
							) : (
								<>Assine o Pro</>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
