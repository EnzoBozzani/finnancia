import { FAQAccordion } from './FAQAccordion';

export const FAQSection = () => {
	return (
		<section className='w-full bg-green-100'>
			<div className='mx-auto max-w-screen-xl py-12 px-6'>
				<h1 className='text-2xl sm:text-4xl font-semibold text-center'>FAQ</h1>
				<FAQAccordion>
					<FAQAccordion.Item value='item-1'>
						<FAQAccordion.Trigger>Como posso adicionar uma nova finança mensal?</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							No painel principal, clique em "Adicionar finança" e preencha os detalhes, garantindo que a
							opção "Recorrente" esteja selecionada para que a finança seja refletida em todas as
							planilhas.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-2'>
						<FAQAccordion.Trigger>
							É possível editar ou excluir uma finança já registrada?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Sim, vá para a seção "Minhas finanças", encontre a finança desejada e clique em "Editar"
							para fazer alterações ou em "Excluir" para remover a finança.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-3'>
						<FAQAccordion.Trigger>
							Como registro finanças individuais além das mensais recorrentes?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Vá para a seção "Minhas finanças" e clique em "Adicionar finança Individual", onde você pode
							detalhar gastos específicos que não são recorrentes.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-4'>
						<FAQAccordion.Trigger>
							Posso visualizar um resumo rápido das minhas finanças em uma única tela?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Sim, utilize a opção "Visão Geral" para ter uma visão consolidada de todas as suas finanças
							e saldos em todas as suas planilhas.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
				</FAQAccordion>
			</div>
		</section>
	);
};
