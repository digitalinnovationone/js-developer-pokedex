// Obtém a referência da lista de Pokémon e do botão "Load More" do HTML
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

// Configurações para controle da quantidade máxima de registros e da quantidade a ser carregada a cada vez
const maxRecords = 151
const limit = 10
let offset = 0;

// Função que converte um objeto Pokemon em uma string HTML para um item de lista
function convertPokemonToLi(pokemon) {
    const pokemonNumber = `#${pokemon.number}`;
    const pokemonName = pokemon.name;

    // Usando um loop 'for' para criar a lista de tipos
    let pokemonTypes = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        const type = pokemon.types[i];
        pokemonTypes += `<li class="type ${type}">${type}</li>`;
    }

    const pokemonPhoto = `<img src="${pokemon.photo}" alt="${pokemon.name}">`;

    return `
      <li class="pokemon ${pokemon.type}" data-pokemon-number="${pokemon.number}">
        <span class="number">${pokemonNumber}</span>
        <span class="name">${pokemonName}</span>
  
        <div class="detail">
          <ol class="types">
            ${pokemonTypes}
          </ol>
  
          ${pokemonPhoto}
        </div>
      </li>
    `;
}
  
// Função para carregar os itens de Pokémon a partir da API
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(function(pokemons = []) {
        // Cria uma string para armazenar o HTML dos novos Pokémon
        let newHtml = '';

        // Itera sobre os Pokémon e adiciona o HTML gerado à string
        for (let i = 0; i < pokemons.length; i++) {
            newHtml += convertPokemonToLi(pokemons[i]);
        }

        // Adiciona o novo HTML à lista existente
        pokemonList.innerHTML += newHtml;
    });
}

// Carrega os primeiros Pokémon ao carregar a página
loadPokemonItens(offset, limit)

// Adiciona um evento para o botão "Load More"
loadMoreButton.addEventListener('click', function() {
    // Incrementa o deslocamento (offset) para carregar a próxima página de Pokémon
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    // Verifica se atingiu ou ultrapassou o número máximo de registros
    if (qtdRecordsWithNextPage >= maxRecords) {
        // Se ultrapassou, ajusta o limite para o restante dos registros
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        // Remove o botão "Load More" pois todos os registros foram carregados
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        // Se não ultrapassou, carrega mais Pokémon normalmente
        loadPokemonItens(offset, limit);
    }
});

