const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');



const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <button name=${pokemon.name} class='details' type='button'>
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
    </button>
    `;
}

const createDetailsCard = (detail) => {
    // console.log(detail);
    return `
    <div class="pokemon-card2 pokemon ${detail.type}">
    <img src="${detail.photo}" alt="${detail.name}" id="photo">
        <h2>Número: <span id="number">${detail.number}</span></h2>
        <h3>Nome: <span id="name">${detail.name}</span></h3>
        <p>Tipo: <span id="type">${detail.type}</span></p>
        <p>Tipos: <span id="types">${detail.types}</span></p>
        <p>Movimentos: <span id="moves">${detail.ability}</span></p>
        <p>Base Stats: <span id="base-stats">${detail.base_stats}</span></p>
    </div>
    `;
  
};

const pokemonDetails = async () => {
    details = document.querySelectorAll('.details');
    details.forEach(async (element) => {
        element.addEventListener('click', async (event) => {
            pokeDetailsResponse = await pokeApi.getDetails(event.currentTarget.name);
            pokemonList.innerHTML = createDetailsCard(pokeDetailsResponse);
        });
    });
};

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        pokemonDetails();
    });
}

loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
