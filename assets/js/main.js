const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1302
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    const paddedNumber = String(pokemon.number).padStart(3, '0');
    
    return `
        <li class="pokemon pokeball-bg ${pokemon.type}">
            <span class="number">#${paddedNumber}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <div class="pokemon-container">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    <div class="pokeball-bg"></div>
                </div>
            </div>
        </li>
    `;
}

let loadedPokemonNames = [];
let addedPokemonNames = [];

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach((pokemon) => {
            // Verifica se o Pokémon já foi carregado ou adicionado
            const pokemonName = pokemon.name.toLowerCase();
            if (!loadedPokemonNames.includes(pokemonName) && !addedPokemonNames.includes(pokemonName)) {
                const newHtml = convertPokemonToLi(pokemon);
                pokemonList.innerHTML += newHtml;
                // Adiciona o nome do Pokémon ao array de nomes carregados
                loadedPokemonNames.push(pokemonName);
            }
        });
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

$(document).ready(function() {
    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.pokemon').each(function() {
            const name = $(this).find('.name').text().toLowerCase();
            const number = $(this).find('.number').text().slice(1);

            if (name.includes(searchTerm) || number.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        // Chama a função getPokemonByName se o item não estiver carregado ou adicionado
        const pokemonNames = $('.name').map(function() {
            return $(this).text().toLowerCase();
        }).get();

        if (!pokemonNames.includes(searchTerm) && !loadedPokemonNames.includes(searchTerm) && !addedPokemonNames.includes(searchTerm)) {
            pokeApi.getPokemonByName(searchTerm).then((pokemon) => {
                const newHtml = convertPokemonToLi(pokemon);
                pokemonList.innerHTML += newHtml;
                // Adiciona o nome do Pokémon ao array de nomes adicionados
                addedPokemonNames.push(searchTerm);
            });
        }
    });
});
