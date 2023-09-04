const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <div class="title">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
        </div>
    <div class="details">
    <div class="image">
    <img src="${pokemon.photo}"
    alt="${pokemon.name}">
    </div>
        <div class="infos">
            <ol class="types">
                <li>Types</li>
                <div class="types-list">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</li>`).join('')}
                </div>
                </ol>
            <ol class="abilities">
            <p>Abilities</p>
            <div class="abilities-list">
                ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability.charAt(0).toUpperCase() + ability.slice(1)}</li>`).join('')}
            </ol>
            </div>
        </div>
        </li>
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
