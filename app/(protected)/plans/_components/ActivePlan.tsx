'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { subscriptionService } from '@/services/subscriptionService';

export const ActivePlan = ({ hasActiveSubscription }: { hasActiveSubscription: boolean }) => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	return (
		<>
			<h6 className={cn('w-[95%] mx-auto text-2xl font-bold mb-4', isDark && 'text-white')}>Plano atual</h6>
			<div
				className={cn(
					'w-[95%] mx-auto rounded-lg border bg-neutral-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-4',
					isDark && 'border-neutral-700 bg-neutral-900 text-white'
				)}
			>
				<div className='space-y-2'>
					<p className='text-center md:text-start font-semibold text-2xl'>
						{hasActiveSubscription ? 'Pro' : 'Gratuito'}
					</p>
					<p className='text-center md:text-start'>
						{hasActiveSubscription
							? 'Para ter o total controle de sua vida financeira'
							: 'Para controlar suas finanças de maneira simples'}
					</p>
					<p className='text-center md:text-start text-sm text-neutral-500'>
						{hasActiveSubscription ? 'R$ 9,90/mês' : 'R$ 0,00/mês'}
					</p>
				</div>
				<div className='flex items-center justify-center md:justify-end'>
					<Button
						disabled={pending}
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
						{pending ? 'Carregando...' : hasActiveSubscription ? 'Gerenciar assinatura' : 'Seja Pro agora'}
					</Button>
				</div>
			</div>
		</>
	);
};
