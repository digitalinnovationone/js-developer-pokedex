const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

                <div class="stats">
                    <span class="attack">Attack: ${pokemon.attack}</span>
                    <span class="defense">Defense: ${pokemon.defense}</span>
                </div>
            </div>
        </li>
    `;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(async (pokemons = []) => {
        for (const pokemon of pokemons) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.number}`);
            const data = await response.json();
            pokemon.attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
            pokemon.defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
        }

        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
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

const toggleDarkModeButton = document.getElementById('toggleDarkMode');

toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Adicione outras ações para alternar elementos específicos para o modo escuro.
});
