'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { subscriptionService } from '@/services/subscriptionService';

export const PlansTable = ({ hasActiveSubscription }: { hasActiveSubscription: boolean }) => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	return (
		<>
			<h6 className={cn('w-[95%] mx-auto text-2xl font-bold mb-4 mt-12', isDark && 'text-white')}>
				Planos disponíveis
			</h6>
			<div className={cn('border-y w-[95%] mx-auto', isDark && 'border-neutral-700 bg-neutral-950 text-white')}>
				<div className='grid grid-cols-3 p-8'>
					<div></div>
					<div className='space-y-2'>
						<p className='text-center md:text-start font-semibold text-2xl'>Gratuito</p>
						<p className='text-center md:text-start text-sm text-neutral-500'>R$ 0,00/mês</p>
					</div>
					<div className='space-y-2'>
						<p className='text-center md:text-start font-semibold text-2xl'>Pro</p>
						<p className='text-center md:text-start text-sm text-neutral-500'>R$ 9,90/mês</p>
						{!hasActiveSubscription && (
							<div className='pt-4'>
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
									{hasActiveSubscription ? 'Gerenciar assinatura' : 'Seja Pro agora'}
								</Button>
							</div>
						)}
					</div>
				</div>
				<div className={cn('bg-neutral-100 grid grid-cols-3 p-8', isDark && 'bg-neutral-900')}>
					<div className='flex items-center justify-center'>Funcionalidades</div>
				</div>
			</div>
		</>
	);
};
