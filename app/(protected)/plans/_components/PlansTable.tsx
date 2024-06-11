'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { VscLoading } from 'react-icons/vsc';

import { Button } from '@/components/ui/button';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';
import { subscriptionService } from '@/services/subscriptionService';

export const PlansTable = ({ hasActiveSubscription }: { hasActiveSubscription: boolean }) => {
	const isDark = useIsDarkTheme();

	const [pending, startTransition] = useTransition();

	const BulletPoint = () => (
		<div
			className={cn(
				'shrink-0 w-[5px] h-[5px] rounded-full bg-green-500',
				isDark ? 'bg-neutral-100' : 'bg-neutral-900'
			)}
		/>
	);

	return (
		<>
			<h6 className={cn('w-[95%] mx-auto text-2xl font-bold mb-4 mt-12', isDark && 'text-white')}>
				Planos disponíveis
			</h6>
			<div
				className={cn(
					'border-y w-[95%] mx-auto mb-6 text-black',
					isDark && 'border-neutral-700 bg-neutral-950 text-white'
				)}
			>
				<div className='grid grid-cols-2 py-8 px-2'>
					<div className='space-y-2'>
						<p className='font-semibold text-2xl'>Gratuito</p>
						<p className='text-sm text-neutral-500'>R$ 0,00/mês</p>
					</div>
					<div className='space-y-2'>
						<p className='font-semibold text-2xl'>Pro</p>
						<p className='text-sm text-neutral-500'>R$ 9,90/mês</p>
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
									{pending ? (
										<>
											<VscLoading className='w-4 h-4 animate-spin mr-2' />
											Carregando
										</>
									) : (
										'Faça o upgrade'
									)}
								</Button>
							</div>
						)}
					</div>
				</div>
				<div
					className={cn(
						'bg-neutral-100 grid grid-cols-2 py-8 px-2 text-xs lg:text-base',
						isDark && 'bg-neutral-900'
					)}
				>
					<div>
						<ul className='space-y-2 mb-6 pl-4'>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Até 40 finanças por planilha</span>
							</li>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Use até 5 categorias</span>
							</li>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Exporte até 1 relatório gratuito</span>
							</li>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Troque até 5 mensagens com Nanci</span>
							</li>
						</ul>
					</div>
					<div>
						<ul className='space-y-2 mb-6 pl-4'>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Finanças ilimitadas</span>
							</li>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Todas as cores de categoria disponíveis</span>
							</li>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Exportações de relatório ilimitadas</span>
							</li>
							<li className='flex items-center gap-x-2'>
								<BulletPoint />
								<span>Mensagens ilimitadas com Nanci</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
