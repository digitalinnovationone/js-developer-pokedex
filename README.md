# Trilha JS Developer - Pokedex

### Projeto Pokedex da Plataforma Dio

### Mudanças e Adições no CSS
* Foram adicionados arquivos CSS e alguns SVG na pasta ***assets/css***.
* Os arquivos adicionados foram implementados na feature **Pokecard**.
* Tambem foram feitas modificações no CSS global ***assets/css/global.css***.
* Não houve mudanças no arquivo ***assets/css/pokedex.css***, apenas o prettier formatou as linhas e nomenclaturas.

### Mudanças e Adições no JS
* Não houve mudanças nos arquivos JS originais, apenas o prettier formatando.
* Foi adicionado o arquivo ***poke-details.js*** que é referente a funcionalidade do Pokecard.

### Mudanças no Index.html
* A unica mudança foi a adição de uma modal para servir como foco e base do ***Pokecard***.
* Alem da adição dos arquivos ***poke-details.css | spinner.css | poke-details.js***.

### Funcionalidade do arquivo **poke-details.js**

| Function | Parametros | Retorna | Funcionalidade |
| :----------------: | :--: | :-----: | ------- |
| getPokemonInfo |  ID | Object | Recebe como parametro o id do pokemon na PokeApi e faz fetch de vários endpoints com o objetivo de retornar um objeto com info do Pokemon
| showPokemonInfo | ID | null | Recebe a ID do pokemon por meio de eventos na DOM, utiliza ***getPokemonInfo*** para obter os dados e renderiza na modal

> A aplicação foi toda desenvolvida para rodar como uma Single Page Application, ela utiliza bastante as interações do usúario com os componentes `<li>`. A cada evento de *hashchange, load e click*, a URL é alterada e o pokecard é executado de novo, o que pode causar um pouco de delay e performance em alguns dispositivos.

* Obs: O template do pokecard foi inspirado nesse [aqui](https://dribbble.com/shots/8529489-Galarian-Pok-dex-iOS-App).
