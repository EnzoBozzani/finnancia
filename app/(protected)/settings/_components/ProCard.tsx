'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { subscriptionService } from '@/services/subscriptionService';

export const ProCard = ({ hasActiveSubscription }: { hasActiveSubscription: boolean }) => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	const BulletPoint = () => (
		<div
			className={cn('w-[5px] h-[5px] rounded-full bg-green-500', isDark ? 'bg-neutral-100' : 'bg-neutral-900')}
		/>
	);

	return (
		<div
			className={cn(
				'shrink-0 flex flex-col items-center justify-between mx-auto w-[95%] border rounded-xl p-4 gap-y-8',
				isDark ? 'text-white border-neutral-700' : 'text-black'
			)}
			id='pro-card'
		>
			<div>
				<h2 className='text-center text-lg font-semibold'>ASSINATURA</h2>
				<p className='text-center text-sm text-neutral-500'>
					{hasActiveSubscription
						? 'Gerencie sua assinatura: veja até quando está ativa, cancele seu plano e mais'
						: 'Dê o upgrade no controle da sua vida financeira! Assine o Pro e tenha acesso ao potencial total do Finnancia'}
				</p>
			</div>
			{!hasActiveSubscription && (
				<>
					<div className='flex w-full items-center justify-center'>
						<Image
							src={'/pro.svg'}
							alt='Pro'
							height={100}
							width={100}
							className='w-[250px] sm:w-[500px] h-auto'
						/>
					</div>
					<div>
						<ul className='text-sm sm:text-base space-y-2 mb-6 pl-4'>
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
						</ul>
					</div>
				</>
			)}
			<Button
				disabled={pending}
				size={'lg'}
				className='w-[90%] text-base sm:text-xl uppercase font-bold'
				onClick={() => {
					startTransition(async () => {
						const res = await subscriptionService.getStripeUrl();

						if (res.error) {
							toast.error('Algo deu errado... Tente novamente mais tarde');
							return;
						}

						window.location.href = res.url;
					});
				}}
			>
				{pending ? 'Carregando...' : hasActiveSubscription ? 'Gerenciar Plano' : 'Seja Pro'}
			</Button>
		</div>
	);
};
