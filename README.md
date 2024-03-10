## O que é?

A CeX Agenda foi inicialmente pensada na loja do MaiaShopping para chegar a um sistema que ajudasse a gerir melhor os testes, fosse a nivel do tester, fosse a nivel de quem enviava artigos para teste.

O sistema atual permite fazer login com a conta Google, seja esta a geral da loja ou do SPV, e cada loja só tem acesso aos seus testes e garantias.  
Qualquer conta que não seja da CeX não consegue aceder ao sistema.

## Utilidade

- ### Enviar para teste

  Ao mandar artigos para teste, podemos ter uma percepção de quantos testes estão por ser resolvidos e, consequentemente conseguimos uma estimativa de tempo de espera para comunicar ao cliente nestes artigos que estão por entrar.  
  (Claro que não custa nada perguntar ao tester uma segunda opinião e por vezes mais realista, mas o foco da Agenda é produtividade)

- ### Tester

  Para quem estiver na zona de testes, é possivel marcar o teste que se vai começar a resolver clicando no botão  Começar a testar   que aparece em cada teste. O card do teste em questão ficará realçado a  verde   para indicar que está a ser testado.

## Como usar?

A navegação é feita através da barra no topo da página. Aí é possivel navegar entre os testes e as garantias. A barra de navegação é composta por dois links do lado esquerdo, um para os testes e outro para as garantias. Do lado direito, se estiveres com sessão iniciada, podes sair da sessão clicando no texto "Logado em:  NomeDaLoja".

- ### Criar um teste

  Para criar um teste, basta clicar no botão "Novo teste" no topo da página. Aparecerá uma "janela pop-up" com um uma lista de campos a preencher. Os campos obrigatórios são:

  - Número da Ordem
  - Ficha de Cliente
  - Tipo de Teste  (Por defeito, o teste aparecerá como  Normal, nesse caso terás que preencher também o campo de  Hora Marcada)

- ### Criar uma garantia
  Para criar uma garantia, basta clicar no botão Nova garantia no topo da página. Aparecerá uma "janela pop-up" com um uma lista de campos a preencher. Os campos obrigatórios são:
  - Número da Ordem
  - Ficha de Cliente

Atenção que a razão do campo de Observações ser opcional é pelo facto de ser algo dinâmico e editável mesmo já depois de criado.

- Para testes, pode deixar-se notas para o tester  (ex: Descontar X e Y) .
- Para garantias, pode deixar-se notas relacionadas à garantia  (ex: Artigo fora de stock a nivel nacional, esperar artigo ficar em stock para pedir Warranty Request).

Todas as ordens (testes e garantias) serão apagadas da base de dados depois de marcadas como resolvidas.

- ### Gerir uma garantia

  Uma garantia é muito flexivel e pode ser editada em vários aspetos mesmo depois de criada.

  O prazo de resolução calcula 30 dias após a criação da garantia. Nesta demonstração, a data de criação é 20 de dezembro de 2999, daí o prazo de resolução ser 19 de janeiro.

  Também é possivel alterar o estado da garantia para as seguintes opções:

  - Substituir
  - Em Análise
  - Reembolsar

  Só é possivel registar ou alterar o  Nº de Warranty Request   quando o estado da garantia for  Substituir.

  O campo de Observações tem a mesma funcionalidade independentemente do tipo de ordem, seja este teste ou garantia. Pode ser editado a qualquer hora e a informação é guardada automaticamente.  
  Se os links forem compostos, estes serão encurtados e clicáveis.  
  (ex: https://google.com não funcionaria mas [https://google.com/search?q=cex](https://google.com/search?q=cex) já seria válido)

## Apresentação

- ### Testes

  Os testes são organizados por hora marcada e por tipo. A prioridade é:

  - Teste  a ser resolvido
  - Testes Normais
  - Testes FPS ou  Drop n' Go

- ### Garantias

  As garantias são organizadas por data de criação. Quando entra um teste de garantia em sistema, a data de criação é a data de entrada do teste, logo a garantia mais antiga é a que está no topo da lista e a que deve ser tratada com mais urgência.

## Por fim

Este projeto ainda não está a 100% mas sempre foi desenvolvido com o foco de ser uma experiência intuitiva e fácil de usar.  
Qualquer bug que encontrem ou dúvida que tenham, sintam-se à vontade para me contactar pelo email da loja ou até mesmo por mensagem para o 916977715 (Diogo).  
Se tiverem sugestões para melhorar o site, também são bem-vindas.

O delay que podem reparar entre requisições provém desta simples razão:  
O plano de host deste site é free. O plano da base de dados deste site é free. Aguentemos!

## What's next? (v1.1)

- Sistema de Abandonados
