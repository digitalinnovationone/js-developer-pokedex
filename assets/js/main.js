const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <a href = "/info?id=${pokemon.number}">
            <li class="pokemon ${pokemon.type}">
                <span class="number ${pokemon.type}">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>  
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            </a>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
    .catch((error) => console.error(error))
    .finally(() => console.log('Requisição Concluida!'))
}
loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () =>{
    offset += limit;

    const qtdRecordMaxPage = offset + limit;

    if (qtdRecordMaxPage >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
}
)