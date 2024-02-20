const pokemonList = document.querySelector('#pokemonList')
const loadMoreButton = document.querySelector('#load-more')

// const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => 
            `
                <li class="pokemon ${pokemon.types[0]}">
                    <span class="dex-number">#${pokemon.dexNumber}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            `            
        ).join('')  
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    // const qtdRecordsWithNextPage = offset + limit

    // if (qtdRecordsWithNextPage >= maxRecords) {
    //     const newLimit = maxRecords - offset
    //     loadPokemonItens(offset, newLimit)

    //     loadMoreButton.parentElement.removeChild(loadMoreButton)
    // } else {
        loadPokemonItens(offset, limit)
    // }

})