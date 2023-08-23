const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const pokemonDetailsContainer = document.querySelector('.pokemon-details');
const detailName = document.querySelector('.detail-name');
const detailTypeList = document.querySelector('.detail-type-list');
const detailImage = document.querySelector('.detail-image img');

let pokemons = []; // Armazena a lista de pokemons carregados
const maxRecords = 151;
const limit = 10;
let offset = 0;

pokemonList.addEventListener('click', event => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        const pokemonIndex = Array.from(pokemonList.children).indexOf(clickedPokemon);
        const selectedPokemon = pokemons[pokemonIndex];
        showPokemonDetails(selectedPokemon);
    }
});

function showPokemonDetails(pokemon) {
    detailName.textContent = pokemon.name;
    detailTypeList.innerHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
    detailImage.src = pokemon.photo;
    pokemonDetailsContainer.classList.add('active');
}


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


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsData) => {
        pokemons = pokemonsData;
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml; // Substituir o conteúdo anterior

        if (offset > 0) {
            showLessButton.style.display = 'block'; // Exibe o botão quando não estiver no início
        } else {
            showLessButton.style.display = 'none'; // Esconde o botão quando estiver no início
        }
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

const showLessButton = document.getElementById('showLessButton');
showLessButton.addEventListener('click', () => {
    if (offset > 0) {
        offset -= limit;
        loadPokemonItems(offset, limit);
        if (offset === 0) {
            showLessButton.style.display = 'none'; // Esconde o botão quando estiver no início
        }
    }
});