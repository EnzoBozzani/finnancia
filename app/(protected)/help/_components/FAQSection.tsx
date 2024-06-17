'use client';

import { cn } from '@/lib/utils';
import { FAQAccordion } from './FAQAccordion';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

export const FAQSection = () => {
	const isDark = useIsDarkTheme();

	return (
		<section className='w-full my-8'>
			<div className='mx-auto'>
				<h1 className={cn('text-2xl sm:text-4xl font-semibold text-center', isDark && 'text-white')}>FAQ</h1>
				<FAQAccordion>
					<FAQAccordion.Item value='item-1'>
						<FAQAccordion.Trigger>
							Preciso adicionar meus dados bancários para registrar finanças?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Não, não é necessário. O Finnancia preza pela segurança, privacidade e flexibilidade.
							Portanto, não é preciso cadastrar nenhum perfil de instituição financeira para gerenciar
							suas finanças, sendo possível fazer isso de maneira flexível, simples e prática.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-7'>
						<FAQAccordion.Trigger>O Finnancia é pago?</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							É possível utilizar o Finnancia sem pagar nada por meio de nosso plano gratuito (o qual não
							exige o cadastro de nenhum método de pagamento), basta fazer login e aproveitar!
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-2'>
						<FAQAccordion.Trigger>
							É possível editar ou excluir uma finança já registrada?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Sim, você pode alterar de maneira extremamente simples clicando no ícone de ações e
							selecionando as opções apresentadas. É possível também duplicar uma finança.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-3'>
						<FAQAccordion.Trigger>Como registro finanças?</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Para registrar finanças individuais é extremamente simples! Quando estiver em alguma tela de
							planilha, basta clicar no botão verde no canto inferior direito da tela!
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-4'>
						<FAQAccordion.Trigger>
							Posso visualizar um resumo rápido das minhas finanças em uma única tela?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Sim, na página do painel você pode ter uma noção total das suas finanças, mostrando dados
							como gasto, ganho e saldo médio por mês, saldo total, além de análises de seus dados!
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-5'>
						<FAQAccordion.Trigger>Como conversar com a Nanci?</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Para bater um papo sobre controle financeiro com a IA do Finnancia, basta clicar no ícone
							"Nanci" na barra lateral, a qual irá te redirecionar para o chat!
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-6'>
						<FAQAccordion.Trigger>
							Como gerar um relatório personalizado, contendo todas minhas finanças do mês e uma análise
							em cima dessas finanças?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Na página da planilha que deseja exportar, clique no botão de exportar. Feito isso, o
							relatório será exportado contendo a análise e todas as finanças do mês.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
				</FAQAccordion>
			</div>
		</section>
	);
};