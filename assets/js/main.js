const pokemonList = document.getElementById('pokeList')
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                    </div>
            </li>`
};

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        })
};

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const newRecordsMany = offset + limit

    if (newRecordsMany >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemons(offset, limit)
    }
})
