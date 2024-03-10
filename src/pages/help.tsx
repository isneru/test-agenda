import { WarrantyDemo } from '@components/cards'
import { NewTestModalDemo, NewWarrantyModalDemo } from '@components/modals'
import { Layout } from '@components/ui'
import { useState } from 'react'

export default function Help() {
	const [isTestModalVisible, setIsTestModalVisible] = useState(false)
	const [isWarrantyModalVisible, setIsWarrantyModalVisible] = useState(false)

	return (
		<Layout>
			<NewTestModalDemo
				isModalVisible={isTestModalVisible}
				setIsModalVisible={setIsTestModalVisible}
			/>
			<NewWarrantyModalDemo
				isModalVisible={isWarrantyModalVisible}
				setIsModalVisible={setIsWarrantyModalVisible}
			/>
			<div className='prose-invert prose-lg container mx-auto'>
				<h2 className='font-semibold'>O que é?</h2>
				<p>
					A CeX Agenda foi inicialmente pensada na loja do MaiaShopping para
					chegar a um sistema que ajudasse a gerir melhor os testes, fosse a
					nivel do tester, fosse a nivel de quem enviava artigos para teste.
				</p>
				<p>
					O sistema atual permite fazer login com a conta Google, seja esta a
					geral da loja ou do SPV, e cada loja só tem acesso aos seus testes e
					garantias.
					<br />
					Qualquer conta que não seja da CeX não consegue aceder ao sistema.
				</p>
				<h2 className='font-semibold'>Utilidade</h2>
				<ul className='list-disc'>
					<li>
						<h3>Enviar para teste</h3>
						<p>
							Ao mandar artigos para teste, podemos ter uma percepção de quantos
							testes estão por ser resolvidos e, consequentemente conseguimos
							uma estimativa de tempo de espera para comunicar ao cliente nestes
							artigos que estão por entrar.
							<br />
							<span className='text-sm italic'>
								&#40;Claro que não custa nada perguntar ao tester uma segunda
								opinião e por vezes mais realista, mas o foco da Agenda é
								produtividade&#41;
							</span>
						</p>
					</li>
					<li>
						<h3>Tester</h3>
						<p>
							Para quem estiver na zona de testes, é possivel marcar o teste que
							se vai começar a resolver clicando no botão&nbsp;
							<button className='text-sm rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
								Começar a testar
							</button>
							&nbsp; que aparece em cada teste. O card do teste em questão
							ficará realçado a&nbsp;
							<span className='font-medium underline decoration-green-500 decoration-4'>
								verde
							</span>
							&nbsp; para indicar que está a ser testado.
						</p>
					</li>
				</ul>
				<h2 className='font-semibold'>Como usar?</h2>
				<p>
					A navegação é feita através da barra no topo da página. Aí é possivel
					navegar entre os testes e as garantias. A barra de navegação é
					composta por dois links do lado esquerdo, um para os testes e outro
					para as garantias. Do lado direito, se estiveres com sessão iniciada,
					podes sair da sessão clicando no texto &quot;Logado em:&nbsp;
					<span className='font-medium'>&lt;Loja&gt;</span>&quot;.
				</p>
				<ul className='list-disc'>
					<li>
						<h3>Criar um teste</h3>
						<p>
							Para criar um teste, basta clicar no botão&nbsp;
							<button
								onClick={() => setIsTestModalVisible(val => !val)}
								className='text-sm rounded-lg bg-red-800 px-3 py-2 transition-colors hover:bg-cex'>
								Novo teste
							</button>
							&nbsp;no topo da página. Aparecerá uma &quot;janela pop-up&quot;
							com um uma lista de campos a preencher. Os campos obrigatórios
							são:
						</p>
						<ol className='list-decimal'>
							<li>Número da Ordem</li>
							<li>Ficha de Cliente</li>
							<li>
								Tipo de Teste&nbsp;
								<span className='text-sm italic'>
									&#40;Por defeito, o teste aparecerá como&nbsp;
									<span className='font-semibold'>Normal</span>, nesse caso
									terás que preencher também o campo de&nbsp;
									<span className='font-semibold'>Hora Marcada</span>&#41;
								</span>
							</li>
						</ol>
					</li>
					<li>
						<h3>Criar uma garantia</h3>
						<p>
							Para criar uma garantia, basta clicar no botão&nbsp;
							<button
								onClick={() => setIsWarrantyModalVisible(val => !val)}
								className='text-sm rounded-lg bg-red-800 px-3 py-2 transition-colors hover:bg-cex'>
								Nova garantia
							</button>
							&nbsp;no topo da página. Aparecerá uma &quot;janela pop-up&quot;
							com um uma lista de campos a preencher. Os campos obrigatórios
							são:
						</p>
						<ol className='list-decimal'>
							<li>Número da Ordem</li>
							<li>Ficha de Cliente</li>
						</ol>
					</li>
				</ul>
				<p>
					Atenção que a razão do campo de Observações ser opcional é pelo facto
					de ser algo dinâmico e editável mesmo já depois de criado.
				</p>
				<ul className='list-disc'>
					<li>
						Para <span className='font-semibold'>testes</span>, pode deixar-se
						notas para o tester&nbsp;
						<span className='text-sm italic'>
							&#40;ex: Descontar X e Y&#41;
						</span>
						.
					</li>
					<li>
						Para <span className='font-semibold'>garantias</span>, pode
						deixar-se notas relacionadas à garantia&nbsp;
						<span className='text-sm italic'>
							&#40;ex: Artigo fora de stock a nivel nacional, esperar artigo
							ficar em stock para pedir Warranty Request&#41;
						</span>
						.
					</li>
				</ul>
				<p>
					Todas as ordens &#40;testes e garantias&#41; serão apagadas da base de
					dados depois de marcadas como resolvidas.
				</p>
				<ul className='list-disc'>
					<li>
						<h3>Gerir uma garantia</h3>
						<div className='flex justify-between gap-16'>
							<div>
								<p>
									Uma garantia é muito flexivel e pode ser editada em vários
									aspetos mesmo depois de criada.
								</p>
								<p>
									O prazo de resolução calcula 30 dias após a criação da
									garantia. Nesta demonstração, a data de criação é 20 de
									dezembro de 2999, daí o prazo de resolução ser 19 de janeiro.
								</p>
								<p>
									Também é possivel alterar o estado da garantia para as
									seguintes opções:
								</p>
								<ul className='list-disc'>
									<li>Substituir</li>
									<li>Em Análise</li>
									<li>Reembolsar</li>
								</ul>
								<p>
									Só é possivel registar ou alterar o&nbsp;
									<span className='font-semibold'>Nº de Warranty Request</span>
									&nbsp; quando o estado da garantia for&nbsp;
									<span className='font-semibold'>Substituir</span>.
								</p>
								<div className='h-20' />
								<p>
									O campo de <span className='font-semibold'>Observações</span>
									&nbsp; tem a mesma funcionalidade independentemente do tipo de
									ordem, seja este teste ou garantia. Pode ser editado a
									qualquer hora e a informação é guardada automaticamente.
									<br />
									Se os links forem compostos, estes serão encurtados e
									clicáveis.
									<br />
									<span className='text-sm italic'>
										&#40;ex: https://google.com não funcionaria mas&nbsp;
										<a
											className='underline'
											href='https://google.com/search?q=cex'
											target='_blank'>
											https://google.com/search?q=cex
										</a>
										&nbsp; já seria válido&#41;
									</span>
								</p>
							</div>
							<div className='flex-1'>
								<WarrantyDemo />
							</div>
						</div>
					</li>
				</ul>
				<h2 className='font-semibold'>Apresentação</h2>
				<ul className='list-disc'>
					<li>
						<h3>Testes</h3>
						<p>
							Os testes são organizados por hora marcada e por tipo. A
							prioridade é:
						</p>
						<ol className='list-decimal'>
							<li>
								Teste&nbsp;
								<span className='font-medium underline decoration-green-500 decoration-4'>
									a ser resolvido
								</span>
							</li>
							<li>
								Testes <span className='font-semibold'>Normais</span>
							</li>
							<li>
								Testes <span className='font-semibold'>FPS</span> ou&nbsp;
								<span className='font-semibold'>Drop n' Go</span>
							</li>
						</ol>
					</li>
					<li>
						<h3>Garantias</h3>
						<p>
							As garantias são organizadas por data de criação. Quando entra um
							teste de garantia em sistema, a data de criação é a data de
							entrada do teste, logo a garantia mais antiga é a que está no topo
							da lista e a que deve ser tratada com mais urgência.
						</p>
					</li>
				</ul>
				<h2 className='font-semibold'>Por fim</h2>
				<p>
					Este projeto ainda não está a 100% mas sempre foi desenvolvido com o
					foco de ser uma experiência intuitiva e fácil de usar.
					<br />
					Qualquer bug que encontrem ou dúvida que tenham, sintam-se à vontade
					para me contactar pelo email da loja ou até mesmo por mensagem para o
					916977715 &#40;Diogo&#41;.
					<br />
					Se tiverem sugestões para melhorar o site, também são bem-vindas.
				</p>
				<p>
					O delay que podem reparar entre requisições provém desta simples
					razão:
					<br />O plano de host deste site é free. O plano da base de dados
					deste site é free. Aguentemos!
				</p>
				<h2 className='font-semibold'>
					What's next? <span className='text-sm italic'>&#40;v1.1&#41;</span>
				</h2>
				<ul className='list-disc'>
					<li>Sistema de Abandonados</li>
				</ul>
			</div>
		</Layout>
	)
}
