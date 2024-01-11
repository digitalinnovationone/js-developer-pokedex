const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonDetails'))
const pokemonModalBody = document.getElementById('modal-body')
const pokemonDetails = document.getElementById('pokemonDetails')

const maxRecords = 200
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <button type="button" class="btn-open-detail-pokemon" onClick="openPokemonDetail(${pokemon.number})">
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
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        loadMoreButton.innerText = 'Load More';
    }).catch((error) => {
        console.error('Error loading Pokemon items:', error);
        loadMoreButton.innerText = 'Load More';
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    loadMoreButton.innerText = 'Loading...';
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

function openPokemonDetail(id) {
    pokeApi.getPokemonDetailsById(id)
        .then((pokemon) => {
            pokemonModalBody.classList.add(pokemon.type)
            pokemonModalBody.innerHTML = `
            <div class="pokemon-container">
            <div class="pokemon-header">
                <div class="header-buttons">
                    <button type="button" class="btn-back" data-bs-dismiss="modal" aria-label="Close"><i class="ph ph-arrow-left"></i></button>
                    <button type="button" class="btn-like" data-bs-dismiss="modal" aria-label="Close"><i class="ph-fill ph-heart"></i></button>
                </div>
                <div class="pokemon-name-container">
                    <h2 class="pokemon-name">${pokemon.name}</h2>
                    <span class="pokemon-number">#${pokemon.number}</span>
                </div>
                <div class="pokemon-types">
                    ${pokemon.types.map(type => `<div class="pokemon-type"><p>${type}</p></div>`).join('')}
                </div>
            </div>
            <img src="${pokemon.photo}"
                        alt="${pokemon.name}" class="pokemon-image">
        </div>

        <div class="pokemon-details">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" id="about-tab" aria-current="page" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="stats-tab" href="#">Base Stats</a>
                </li>
            </ul>
            <div class="tab-body">
                <h3 class="details-title mt-2">Height</h3>
                <p>${pokemon.height/10} cm</p>
                <h3 class="details-title mt-2">Weight</h3>
                <p>${pokemon.weight/10} kg</p>
                <h3 class="details-title mt-2">Abilities</h3>
                <p>${pokemon.abilities.map(ability => ability).join(', ')}</p>
            </div>
        </div>

            `;

            const aboutTab = document.getElementById('about-tab');
            const baseStatsTab = document.getElementById('stats-tab');

            aboutTab.addEventListener('click', () => {
                aboutTab.classList.toggle('active');
                baseStatsTab.classList.toggle('active');
                updateTabContent('About', pokemon);
            });

            baseStatsTab.addEventListener('click', () => {
                baseStatsTab.classList.toggle('active');
                aboutTab.classList.toggle('active');
                updateTabContent('Base Stats', pokemon);
            });
        })
        .catch((error) => {
            console.error('Error loading Pokemon details:', error);
        });
    pokemonModal.show()

}

function updateTabContent(tab, pokemon) {
    const tabBody = document.querySelector('.tab-body');
    tabBody.innerHTML = '';

    if (tab === 'About') {
        tabBody.innerHTML = `
            <h3 class="details-title mt-2">Height</h3>
            <p>${pokemon.height / 10} cm</p>
            <h3 class="details-title mt-2">Weight</h3>
            <p>${pokemon.weight / 10} kg</p>
            <h3 class="details-title mt-2">Abilities</h3>
            <p>${pokemon.abilities.join(', ')}</p>
        `;
    } else if (tab === 'Base Stats') {
        Object.entries(pokemon.stats).forEach(([statName, baseStat]) => {
            const statTitle = statName.charAt(0).toUpperCase() + statName.slice(1).replace('-', ' ');
            const percentage = (baseStat / 255) * 100;
            const redArray = ['hp', 'defense', 'speed']
            tabBody.innerHTML += `
            <div class="details-container">
                <div class="details-title">
                    <h5>${statTitle}:</h5>
                </div>
                <div class="details-value">
                    <p>${baseStat}</p>
                </div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${percentage}%; background: ${redArray.includes(statName) ? '#fb6c6c' : '#4ac17b'}"></div>
                </div>
            </div>
            `;
        });
    }
}

pokemonDetails.addEventListener('hidden.bs.modal', function (event) {
    pokemonModalBody.removeAttribute('class')
    pokemonModalBody.classList.add('modal-body')

  })