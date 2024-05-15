'use client';

import { useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

export const AIReportSwitch = ({ includeAIAnalysis }: { includeAIAnalysis: boolean }) => {
	const isDark = useIsDarkTheme();

	const [status, setStatus] = useState(includeAIAnalysis);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div
			className={cn(
				'flex flex-col sm:flex-row items-center justify-between mx-auto w-[95%] border rounded-xl p-4 gap-6',
				isDark ? 'text-white border-neutral-700' : 'text-black'
			)}
		>
			<div>
				<h2 className='text-center sm:text-start text-lg font-semibold'>ANÁLISE DE IA</h2>
				<p className='text-center sm:text-start text-sm text-neutral-500'>
					Decida se deseja adicionar a análise de IA nos relatórios PDF exportados.
				</p>
			</div>
			<div className='me-0 sm:me-6 flex flex-col items-center gap-y-2'>
				<Switch
					disabled={true}
					checked={status}
					onCheckedChange={() => {
						setIsLoading(true);
						setStatus((current) => !current);

						//setar no db a nova configuração
						setIsLoading(false);
					}}
					style={{
						backgroundColor: status ? '#16a34a' : isDark ? '#fff' : '#000',
					}}
				/>
				<p className='text-xs sm:text-sm'>{status ? 'Ativado' : 'Desativado'}</p>
			</div>
		</div>
	);
};
