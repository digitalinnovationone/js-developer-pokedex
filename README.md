# Trilha JS Developer - Pokedex

## Desafio de código utilizando uma API REST, PokeAPI.
 
<p>Adicionar página de detalhamento do pokemon.</p>

## Como foi realizado o desafio

<p>Primeiramente fiz o design da página de detalhamento utilizando html, css e javascript, no "Informations"/"Stats". Ao clicar no pokemon desejado na página inicial, o javascript envia o id, por parâmetro na url da página de detalhamento, que o mesmo é resgatado por uma função que retorna o valor do id. A partir do id faço uma nova requisição utilizando o "fetch", na qual me retorna todas as informações do pokemon pelo id recebido, em seguida converte para json e armazena no "pokemon-model" que, então, é utilizado para exibir as informações necessárias do pokemon na tela de detalhamento do pokemon.</p>
