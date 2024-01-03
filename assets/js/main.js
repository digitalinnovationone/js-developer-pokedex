const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 9
let offset = 0;

function convertPokemonToLi(pokemon) {
    return ` 
    <div class="pokemons-div">
        <div class="pokemons-div-card">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">Nome: ${pokemon.name}</span>
                <span class="base_experience">Exp: ${pokemon.base_experience}</span>
                <span class="height">Altura: ${pokemon.height}</span>
                <span class="weight">Peso: ${pokemon.weight}</span>
                <span class="info-button" title="${pokemon.abilities}">Habilidades</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        </div>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})