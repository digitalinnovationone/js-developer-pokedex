// Obtém a referência da lista de Pokémon e do botão "Load More" do HTML
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

// Configurações para controle da quantidade máxima de registros e da quantidade a ser carregada a cada vez
const maxRecords = 151
const limit = 10
let offset = 0;

// Função que converte um objeto Pokemon em uma string HTML para um item de lista
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Função para carregar os itens de Pokémon a partir da API
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Converte os Pokémon em HTML e os adiciona à lista existente
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

// Carrega os primeiros Pokémon ao carregar a página
loadPokemonItens(offset, limit)

// Adiciona um evento para o botão "Load More"
loadMoreButton.addEventListener('click', () => {
    // Incrementa o deslocamento (offset) para carregar a próxima página de Pokémon
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    // Verifica se atingiu ou ultrapassou o número máximo de registros
    if (qtdRecordsWithNextPage >= maxRecords) {
        // Se ultrapassou, ajusta o limite para o restante dos registros
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        // Remove o botão "Load More" pois todos os registros foram carregados
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // Se não ultrapassou, carrega mais Pokémon normalmente
        loadPokemonItens(offset, limit)
    }
})
