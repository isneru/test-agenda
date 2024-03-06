import { Layout } from '@components/ui'

export default function Help() {
	return (
		<Layout>
			<div className='prose-invert prose-lg container mx-auto'>
				<h2 className='font-semibold'>O que é?</h2>
				<p>
					A CeX Agenda foi inicialmente pensada na loja do MaiaShopping para
					chegar a um sistema que ajudasse a gerir melhor os testes, fosse a
					nivel do tester, fosse a nivel de quem enviava artigos para teste.
				</p>
				<h2 className='font-semibold'>Como usar?</h2>
				<p>
					A navegação é feita através da barra no topo da página. Aí é possivel
					navegar entre os testes e as garantias. A barra de navegação é
					composta por dois links do lado esquerdo, um para os testes e outro
					para as garantias. Do lado direito, se estiveres com sessão iniciada,
					podes sair da sessão clicando no texto &quot;Logado em:&nbsp;
					<span className='font-medium'>&lt;Loja&gt;</span>&quot;.
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
							<span className='prose-invert text-sm italic'>
								(Claro que não custa nada perguntar ao tester uma segunda
								opinião e por vezes mais realista, mas o foco da Agenda é
								produtividade)
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
			</div>
		</Layout>
	)
}
