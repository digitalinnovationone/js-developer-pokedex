const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let pokemonButtons;

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <button class="pokemonButton ${pokemon.type}">
                <div class="pokemonNameAndId">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </button>
        </li>
    `
}

async function loadPokemonItens(offset, limit) {
    try {
        const pokemons = await pokeApi.getPokemons(offset, limit);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        return pokemons;
    } catch (error) {
        console.error('Error loading Pokemon items:', error);
    }
}

function getPokemonButtons () {
    const pokemonButtons = document.querySelectorAll('.pokemonButton')
    return pokemonButtons
}

loadPokemonItens(offset, limit)

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        // Verifica se houve alterações no conteúdo do elemento <ol>
        if (mutation.type === 'childList') {
            // O conteúdo da lista ordenada foi modificado
            pokemonButtons = getPokemonButtons()
            pokemonButtons.forEach(addPokemonButtonClickHandler);
            // Aqui você pode fazer o que precisar em resposta às alterações no conteúdo da lista
        }
    });
});

// Configura as opções para observar alterações no conteúdo da lista ordenada
const config = { childList: true, subtree: true };

// Inicia a observação no elemento <ol> com as opções configuradas
observer.observe(pokemonList, config);


loadMoreButton.addEventListener('click', async () => {
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


