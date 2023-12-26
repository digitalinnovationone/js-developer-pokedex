const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="openModal(${pokemon.number})">
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

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
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

function openModal(number) {
    var modal = document.getElementById('myModal');

    var modalContent = document.querySelector('.modal-content');

    // Construir o conteúdo do modal com base nos parâmetros fornecidos
    pokeApi.getPokemonDetailToMoidal(number).then( pokemon => {
        console.log(pokemon);
        var modalHTML = `
            <div class="modal-content">
                <div>
                    <span class="close" onclick="closeModal()">&times;</span>
                </div>
                 <div class="pokemonDetailContainer">
                    <div class="pokemonDetail ${pokemon.type}"> 
                        <span class="number">#${pokemon.number}</span>
                            <span class="nameDetail">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                    </ol>
                        </div>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-stats">
                        <div class="tab active" data-tab="about" onclick="showTab('about')">About</div>
                        <div class="tab" data-tab="base-stats" onclick="showTab('base-stats')">Base Stats</div>
                        <div class="tab" data-tab="evolution" onclick="showTab('evolution')">Evolution</div>
                        <div class="tab" data-tab="moves" onclick="showTab('moves')">Moves</div>
                    
                        <div class="tab-content active" id="about-content">
                            <!-- Conteúdo da tab "About" -->
                            <div class="pokemon-info">
                                <p><strong>Height:</strong> ${pokemon.height}</p>
                                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                                <p><strong>Species:</strong> ${pokemon.species}</p>
                                <p><strong>Abilities:</strong></p>
                                <ul class="ability-list">
                                    ${pokemon.abilities.map((ability) => `<li>${ability.ability.name}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="base-stats-content" style="display: none;">
                            <!-- Conteúdo da tab "Base Stats" -->
                            <p>Estatísticas base do Pokémon...</p>
                        </div>
                        
                        <div class="tab-content" id="evolution-content" style="display: none;">
                            <!-- Conteúdo da tab "Evolution" -->
                            <p>Informações sobre a evolução do Pokémon...</p>
                        </div>
                        
                        <div class="tab-content" id="moves-content" style="display: none;">
                            <!-- Conteúdo da tab "Moves" -->
                            <div class="detail">
                                <ol class="moves-list">
                                    ${pokemon.moves.slice(0, 10).map((move) => `<li class="moves">${move.move.name}</li>`).join('')}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalContent.innerHTML = modalHTML;

        modal.style.display = 'block';
    });
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// Fechar o modal se o usuário clicar fora dele
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

function showTab(tabName) {
    // Oculta todos os conteúdos das tabs e remove a classe active das tabs
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(content) {
        content.style.display = 'none';
    });

    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    // Mostra o conteúdo da tab correspondente e adiciona a classe active à tab
    var selectedTabContent = document.getElementById(tabName + '-content');
    var selectedTab = document.querySelector('.tab[data-tab="' + tabName + '"]');

    if (selectedTabContent && selectedTab) {
        selectedTabContent.style.display = 'block';
        selectedTab.classList.add('active');
    }
}

