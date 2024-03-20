import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { RiOrganizationChart } from 'react-icons/ri';
import { VscGitPullRequestCreate } from 'react-icons/vsc';
import { LuMonitorSmartphone } from 'react-icons/lu';

import { FeatureArticle } from './FeatureArticle';

export const FeaturesSection = () => {
	return (
		<section className='mx-auto max-w-screen-xl py-12 px-6'>
			<h1 className='text-2xl sm:text-4xl font-semibold text-center'>O que te proporcionamos</h1>
			<p className='w-auto md:w-[700px] mx-auto text-sm text-neutral-400 text-center mt-2 font-semibold bg-white'>
				Nossos principais recursos que fazem com que você possa ter a experiência ideal enquanto tem o controle
				total de suas finanças
			</p>
			<div className='grid grid-cols-1 md:grid-cols-2 mt-8'>
				<FeatureArticle>
					<FeatureArticle.Icon>
						<RiOrganizationChart className='w-10 h-10' />
					</FeatureArticle.Icon>
					<FeatureArticle.Title>Controle Centralizado</FeatureArticle.Title>
					<FeatureArticle.Text>
						Adicione finanças mensais recorrentes uma vez, e o Finnancia automaticamente as distribuirá em
						todas as suas planilhas, proporcionando uma visão centralizada de seus compromissos financeiros.
					</FeatureArticle.Text>
				</FeatureArticle>
				<FeatureArticle>
					<FeatureArticle.Icon>
						<VscGitPullRequestCreate className='w-10 h-10' />
					</FeatureArticle.Icon>
					<FeatureArticle.Title>Flexibilidade no Registro</FeatureArticle.Title>
					<FeatureArticle.Text>
						Registre finanças individuais com precisão, oferecendo uma análise detalhada e precisa de seus
						hábitos de gastos para uma visão abrangente de suas finanças.
					</FeatureArticle.Text>
				</FeatureArticle>
				<FeatureArticle>
					<FeatureArticle.Icon>
						<LuMonitorSmartphone className='w-10 h-10' />
					</FeatureArticle.Icon>
					<FeatureArticle.Title>Interface Amigável</FeatureArticle.Title>
					<FeatureArticle.Text>
						Navegue entre diferentes planilhas sem esforço, garantindo uma experiência rápida e direta para
						que os usuários possam acessar e gerenciar seus dados financeiros com facilidade.
					</FeatureArticle.Text>
				</FeatureArticle>
				<FeatureArticle>
					<FeatureArticle.Icon>
						<FaMoneyCheckDollar className='w-10 h-10' />
					</FeatureArticle.Icon>
					<FeatureArticle.Title>Facilitador Financeiro</FeatureArticle.Title>
					<FeatureArticle.Text>
						O Finnancia simplifica o controle financeiro como nunca antes, fornecendo aos usuários uma
						ferramenta poderosa para gerenciar suas finanças de maneira inteligente e eficaz, promovendo uma
						tomada de decisões financeiras mais informada.
					</FeatureArticle.Text>
				</FeatureArticle>
			</div>
		</section>
	);
};
