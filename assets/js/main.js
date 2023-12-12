const liPokemons = document.querySelector('.pokemons');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecord = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="datail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemon(offset, limit)
        .then((pokemonList = []) => {
            liPokemons.innerHTML += pokemonList.map(convertPokemonToLi).join('');
        })
        .catch((error) => console.log(error))
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    if (qtdRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

        return
    }
    loadPokemonItens(offset, limit)
})
