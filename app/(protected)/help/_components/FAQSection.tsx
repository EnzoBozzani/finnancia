'use client';

import { cn } from '@/lib/utils';
import { FAQAccordion, FAQAccordionContent, FAQAccordionItem, FAQAccordionTrigger } from './FAQAccordion';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';

export const FAQSection = () => {
	const isDark = useIsDarkTheme();

	return (
		<section className='w-full my-8'>
			<div className='mx-auto'>
				<h1 className={cn('text-2xl sm:text-4xl font-semibold text-center', isDark && 'text-white')}>FAQ</h1>
				<FAQAccordion>
					<FAQAccordionItem value='item-1'>
						<FAQAccordionTrigger>
							Preciso adicionar meus dados bancários para registrar finanças?
						</FAQAccordionTrigger>
						<FAQAccordionContent>
							Não, não é necessário. O Finnancia preza pela segurança, privacidade e flexibilidade.
							Portanto, não é preciso cadastrar nenhum perfil de instituição financeira para gerenciar
							suas finanças, sendo possível fazer isso de maneira flexível, simples e prática.
						</FAQAccordionContent>
					</FAQAccordionItem>
					<FAQAccordionItem value='item-7'>
						<FAQAccordionTrigger>O Finnancia é pago?</FAQAccordionTrigger>
						<FAQAccordionContent>
							É possível utilizar o Finnancia sem pagar nada por meio de nosso plano gratuito (o qual não
							exige o cadastro de nenhum método de pagamento), basta fazer login e aproveitar!
						</FAQAccordionContent>
					</FAQAccordionItem>
					<FAQAccordionItem value='item-2'>
						<FAQAccordionTrigger>
							É possível editar ou excluir uma finança já registrada?
						</FAQAccordionTrigger>
						<FAQAccordionContent>
							Sim, você pode alterar de maneira extremamente simples clicando no ícone de ações e
							selecionando as opções apresentadas. É possível também duplicar uma finança.
						</FAQAccordionContent>
					</FAQAccordionItem>
					<FAQAccordionItem value='item-3'>
						<FAQAccordionTrigger>Como registro finanças?</FAQAccordionTrigger>
						<FAQAccordionContent>
							Para registrar finanças individuais é extremamente simples! Quando estiver em alguma tela de
							planilha, basta clicar no botão verde no canto inferior direito da tela!
						</FAQAccordionContent>
					</FAQAccordionItem>
					<FAQAccordionItem value='item-4'>
						<FAQAccordionTrigger>
							Posso visualizar um resumo rápido das minhas finanças em uma única tela?
						</FAQAccordionTrigger>
						<FAQAccordionContent>
							Sim, na página do painel você pode ter uma noção total das suas finanças, mostrando dados
							como gasto, ganho e saldo médio por mês, saldo total, além de análises de seus dados!
						</FAQAccordionContent>
					</FAQAccordionItem>
					<FAQAccordionItem value='item-5'>
						<FAQAccordionTrigger>Como conversar com a Nanci?</FAQAccordionTrigger>
						<FAQAccordionContent>
							Para bater um papo sobre controle financeiro com a IA do Finnancia, basta clicar no ícone
							"Nanci" na barra lateral, a qual irá te redirecionar para o chat!
						</FAQAccordionContent>
					</FAQAccordionItem>
					<FAQAccordionItem value='item-6'>
						<FAQAccordionTrigger>
							Como gerar um relatório personalizado, contendo todas minhas finanças do mês e uma análise
							em cima dessas finanças?
						</FAQAccordionTrigger>
						<FAQAccordionContent>
							Na página da planilha que deseja exportar, clique no botão de exportar. Feito isso, o
							relatório será exportado contendo a análise e todas as finanças do mês.
						</FAQAccordionContent>
					</FAQAccordionItem>
				</FAQAccordion>
			</div>
		</section>
	);
};
