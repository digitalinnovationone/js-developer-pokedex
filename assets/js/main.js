const spinner = document.getElementById('spinner');
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="expandPokemon(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}


function loadPokemonItens(offset, limit) {
    return pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit)

function expandPokemon(element) {
    // Remove a overlay existente
    const existingOverlay = document.querySelector('.overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Cria a overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.addEventListener('click', closeOverlay); // Adiciona um event listener para fechar ao clicar na overlay
    document.body.appendChild(overlay);

    // Clona o item e adiciona a classe 'expanded'
    const expandedPokemon = element.cloneNode(true);
    expandedPokemon.classList.add('expanded');

    // Adiciona o botão de fechar ao item expandido
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', closeOverlay);
    expandedPokemon.appendChild(closeButton);

    // Adiciona o item expandido ao corpo do documento
    document.body.appendChild(expandedPokemon);

    // Adiciona classe de destaque ao item clicado
    element.classList.add('highlight');
}

// Função para fechar o item expandido e a overlay
function closeOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.remove();

    const expandedPokemon = document.querySelector('.pokemon.expanded');
    expandedPokemon.remove();
}




loadMoreButton.addEventListener('click', () => {
    // Mostra o spinner
    spinner.style.display = 'block';

    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)
            .then(() => {
                // Remove o botão "Load More" e esconde o spinner
                loadMoreButton.parentElement.removeChild(loadMoreButton);
                spinner.style.display = 'none';
            })
            .catch((error) => {
                console.error('Erro ao carregar Pokémon:', error);
                spinner.style.display = 'none'; // Certifique-se de esconder o spinner em caso de erro
            });
    } else {
        loadPokemonItens(offset, limit)
            .then(() => {
                // Esconde o spinner após o carregamento
                spinner.style.display = 'none';
            })
            .catch((error) => {
                console.error('Erro ao carregar Pokémon:', error);
                spinner.style.display = 'none'; // Certifique-se de esconder o spinner em caso de erro
            });
    }
});  
