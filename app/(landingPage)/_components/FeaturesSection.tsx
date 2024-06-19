import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { RiOrganizationChart } from 'react-icons/ri';
import { VscGitPullRequestCreate } from 'react-icons/vsc';
import { LuMonitorSmartphone } from 'react-icons/lu';
import { FaGoogle } from 'react-icons/fa';
import { SiCircuitverse } from 'react-icons/si';

import { FeatureArticle, FeatureArticleIcon, FeatureArticleText, FeatureArticleTitle } from './FeatureArticle';

export const FeaturesSection = () => {
	return (
		<div className='white-bg'>
			<section className='mx-auto max-w-screen-xl py-12 px-6'>
				<h1 className='text-2xl sm:text-4xl font-semibold text-center'>O que te proporcionamos</h1>
				<p className='w-auto md:w-[700px] mx-auto text-sm text-neutral-400 text-center mt-2 font-semibold bg-white'>
					Nossos principais recursos que fazem com que você possa ter a experiência ideal enquanto gerencia
					suas finanças
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 mt-8'>
					<FeatureArticle>
						<FeatureArticleIcon>
							<RiOrganizationChart className='w-10 h-10' />
						</FeatureArticleIcon>
						<FeatureArticleTitle>Controle Centralizado</FeatureArticleTitle>
						<FeatureArticleText>
							Tenha acesso a uma visão geral e centralizada de suas finanças diretamente pelo painel,
							trazendo uma forte perspectiva da sua vida financeira por meio de análises profundas em seus
							dados.
						</FeatureArticleText>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticleIcon>
							<VscGitPullRequestCreate className='w-10 h-10' />
						</FeatureArticleIcon>
						<FeatureArticleTitle>Flexibilidade no Registro</FeatureArticleTitle>
						<FeatureArticleText>
							Adicione, edite, duplique e remova finanças de maneira simples e prática, permitindo uma
							enorme flexibilidade no registro e gestão de finanças. Estando conectado, você pode
							gerenciar suas finanças de qualquer lugar!
						</FeatureArticleText>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticleIcon>
							<LuMonitorSmartphone className='w-10 h-10' />
						</FeatureArticleIcon>
						<FeatureArticleTitle>Interface Amigável</FeatureArticleTitle>
						<FeatureArticleText>
							Por meio de uma interface extremamente intuitiva e agradável, navegue entre planilhas sem
							esforço algum, tendo uma grande facilidade no gerenciamento dos dados financeiros.
						</FeatureArticleText>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticleIcon>
							<FaGoogle className='w-10 h-10' />
						</FeatureArticleIcon>
						<FeatureArticleTitle>Login simplificado</FeatureArticleTitle>
						<FeatureArticleText>
							Não se preocupe com nenhuma burocracia para utilizar o Finnancia. Entre sem dificuldade
							alguma utilizando diretamente sua conta Google, tendo total certeza de que seus dados estão
							seguros.
						</FeatureArticleText>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticleIcon>
							<SiCircuitverse className='w-10 h-10' />
						</FeatureArticleIcon>
						<FeatureArticleTitle>Gestão inteligente com a Nanci</FeatureArticleTitle>
						<FeatureArticleText>
							Utilizando todo o poder da Nanci, sua inteligência artificial especializada no controle
							financeiro, você poderá receber as mais diversas análises personalizadas sobre suas
							finanças, além de interagir com a IA sobre qualquer assunto financeiro de sua vontade.
						</FeatureArticleText>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticleIcon>
							<FaMoneyCheckDollar className='w-10 h-10' />
						</FeatureArticleIcon>
						<FeatureArticleTitle>Facilitador Financeiro</FeatureArticleTitle>
						<FeatureArticleText>
							O Finnancia simplifica o controle financeiro como nunca antes, fornecendo aos usuários uma
							ferramenta poderosa para gerenciar suas finanças de maneira inteligente e eficaz, promovendo
							uma tomada de decisões financeiras mais informada.
						</FeatureArticleText>
					</FeatureArticle>
				</div>
			</section>
		</div>
	);
};
