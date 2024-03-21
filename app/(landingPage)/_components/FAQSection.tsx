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
							No painel principal, clique em "Adicionar finança" e preencha os detalhes. Feito isso, a
							finança será adicionada em cada nova planilha que for criada. Também é possível alterar
							essas finanças individualmente quando forem inseridas nas planilhas.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-2'>
						<FAQAccordion.Trigger>
							É possível editar ou excluir uma finança já registrada?
						</FAQAccordion.Trigger>
						<FAQAccordion.Content>
							Sim, você pode alterar de maneira extremamente simples clicando no ícone de ações e
							selecionando as opções apresentadas. É possível editar e remover também finanças mensais.
						</FAQAccordion.Content>
					</FAQAccordion.Item>
					<FAQAccordion.Item value='item-3'>
						<FAQAccordion.Trigger>Como registro finanças individuais?</FAQAccordion.Trigger>
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
				</FAQAccordion>
			</div>
		</section>
	);
};
