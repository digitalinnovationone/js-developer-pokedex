const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function renderPokemons(pokemons) {
    const html = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += html;
}

function loadNextPokemons() {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        renderPokemons(pokemons);
        offset += limit;

        if (offset >= maxRecords) {
            loadMoreButton.style.display = 'none';
        }
    });
}

loadNextPokemons();

loadMoreButton.addEventListener('click', loadNextPokemons);
