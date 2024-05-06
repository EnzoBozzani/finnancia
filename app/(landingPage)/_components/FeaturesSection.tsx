import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { RiOrganizationChart } from 'react-icons/ri';
import { VscGitPullRequestCreate } from 'react-icons/vsc';
import { LuMonitorSmartphone } from 'react-icons/lu';
import { FaGoogle } from 'react-icons/fa';
import { SiCircuitverse } from 'react-icons/si';

import { FeatureArticle } from './FeatureArticle';

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
						<FeatureArticle.Icon>
							<RiOrganizationChart className='w-10 h-10' />
						</FeatureArticle.Icon>
						<FeatureArticle.Title>Controle Centralizado</FeatureArticle.Title>
						<FeatureArticle.Text>
							Tenha acesso a uma visão geral e centralizada de suas finanças diretamente pelo painel,
							trazendo uma forte perspectiva da sua vida financeira por meio de análises profundas em seus
							dados.
						</FeatureArticle.Text>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticle.Icon>
							<VscGitPullRequestCreate className='w-10 h-10' />
						</FeatureArticle.Icon>
						<FeatureArticle.Title>Flexibilidade no Registro</FeatureArticle.Title>
						<FeatureArticle.Text>
							Adicione, edite, duplique e remova finanças de maneira simples e prática, permitindo uma
							enorme flexibilidade no registro e gestão de finanças. Estando conectado, você pode
							gerenciar suas finanças de qualquer lugar!
						</FeatureArticle.Text>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticle.Icon>
							<LuMonitorSmartphone className='w-10 h-10' />
						</FeatureArticle.Icon>
						<FeatureArticle.Title>Interface Amigável</FeatureArticle.Title>
						<FeatureArticle.Text>
							Por meio de uma interface extremamente intuitiva e agradável, navegue entre planilhas sem
							esforço algum, tendo uma grande facilidade no gerenciamento dos dados financeiros.
						</FeatureArticle.Text>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticle.Icon>
							<FaGoogle className='w-10 h-10' />
						</FeatureArticle.Icon>
						<FeatureArticle.Title>Login simplificado</FeatureArticle.Title>
						<FeatureArticle.Text>
							Não se preocupe com nenhuma burocracia para utilizar o Finnancia. Entre sem dificuldade
							alguma utilizando diretamente sua conta Google, tendo total certeza de que seus dados estão
							seguros.
						</FeatureArticle.Text>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticle.Icon>
							<SiCircuitverse className='w-10 h-10' />
						</FeatureArticle.Icon>
						<FeatureArticle.Title>Gestão inteligente com a Nanci</FeatureArticle.Title>
						<FeatureArticle.Text>
							Utilizando todo o poder da Nanci, sua inteligência artificial especializada no controle
							financeiro, você poderá receber as mais diversas análises personalizadas sobre suas
							finanças, além de interagir com a IA sobre qualquer assunto financeiro de sua vontade.
						</FeatureArticle.Text>
					</FeatureArticle>
					<FeatureArticle>
						<FeatureArticle.Icon>
							<FaMoneyCheckDollar className='w-10 h-10' />
						</FeatureArticle.Icon>
						<FeatureArticle.Title>Facilitador Financeiro</FeatureArticle.Title>
						<FeatureArticle.Text>
							O Finnancia simplifica o controle financeiro como nunca antes, fornecendo aos usuários uma
							ferramenta poderosa para gerenciar suas finanças de maneira inteligente e eficaz, promovendo
							uma tomada de decisões financeiras mais informada.
						</FeatureArticle.Text>
					</FeatureArticle>
				</div>
			</section>
		</div>
	);
};
