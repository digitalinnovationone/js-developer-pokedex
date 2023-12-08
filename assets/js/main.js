const pokemonContainer = document.getElementById('pokemonList')
const btnTop = document.getElementById('btnTop');
const searForm = document.getElementById('search');

const maxRecords = 1275;
const limit = 20;
let offset = 0;

window.onload = function () { scrollFunction() };

window.onscroll = function () { scrollFunction() };

window.addEventListener('scroll', debounce(onScroll, 100));

searForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.getElementById('searchPokemon').value;
    window.location.href = `details.html?pokemon=${search}`
})

function onScroll() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        loadMorePokemons();
    }
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonList.map((pokemon) => {
            const newPokemon = convertPokemonToLi(pokemon);
            pokemonContainer.appendChild(newPokemon);
            newPokemon.addEventListener('click', () => {
                window.location.href = `details.html?pokemon=${pokemon.number}`;
            });
        });

    });
}

loadPokemons(offset, limit);

function loadMorePokemons() {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)
    } else {
        loadPokemons(offset, limit)
    }
}
