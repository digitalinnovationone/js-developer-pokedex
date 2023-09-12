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

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function openPokemonDetails(pokemon) {
    console.log(pokemon)
    // Definição de janela com detalhes do Pokémon
    const detailsWindow = window.open('', 'PokemonDetails', 'width=400,height=400');

    // Detalhes do Pokémon
    const content = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p>IdPokemon: ${pokemon.number}</p>
        <p>Type: ${pokemon.type}</p>
        <p>Abilities: ${pokemon.abilities.join(', ')}</p>
        <p>Moves: ${pokemon.moves.join(', ')}</p>
        <button onclick="window.close()">Fechar</button>
    `;

    // Inserindo o conteúdo da nova janela
    detailsWindow.document.body.innerHTML = content;
}

// Variável pokemons em escopo global
let pokemons = []; 


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((fetchedPokemons  = []) => {
        pokemons = fetchedPokemons;
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    })
}

// Fora da função loadPokemonItens
pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        const index = Array.from(clickedPokemon.parentElement.children).indexOf(clickedPokemon);
        openPokemonDetails(pokemons[index]);
    }
});

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