
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type.toLowerCase()}">
            <span class="number">${pokemon.num}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type.toLowerCase()}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <!-- Adicione o botão para exibir as estatísticas no final do cartão -->
            </div>
            <button class="stats-btn" data-pokemon='${JSON.stringify(pokemon)}'>Mostrar Stats</button>
        </li>
    `;
}


const pokemonList = document.getElementById('pokemonList');

pokeApi.getPokemons().then((pokemons = []) => {
    console.log("Stats do primeiro Pokémon:", pokemons[0].stats);
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
});

const loadMoreBtn = document.getElementById('carregarMais');
let offset = 0;

loadMoreBtn.addEventListener('click', () => {
    offset += 20;
    pokeApi.getPokemons(offset)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML += newHtml;
        });
});

function displayPokemonStats(pokemon) {
    const abaContent = document.getElementById('abaContent');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonName = document.getElementById('pokemonName');
    const statsList = document.getElementById('statsList');
    const pokemonAba = document.getElementById('pokemonAba');

    pokemonAba.className = 'pokemon-aba';

    pokemonAba.classList.add(pokemon.type.toLowerCase());

    statsList.innerHTML = '';

    const stats = [
        { name: 'HP', value: pokemon.stats.hp, max: 255 },
        { name: 'Ataque', value: pokemon.stats.atk, max: 255 },
        { name: 'Defesa', value: pokemon.stats.def, max: 255 },
        { name: 'Ataque Especial', value: pokemon.stats.sAtk, max: 255 },
        { name: 'Defesa Especial', value: pokemon.stats.sDef, max: 255 },
        { name: 'Velocidade', value: pokemon.stats.spd, max: 255 },
    ];

    stats.forEach((stat) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${stat.name}:</strong> <span id="${stat.name.toLowerCase()}Value">${stat.value}</span>`;
        const statBar = document.createElement('div');
        statBar.className = 'stat-bar';
        statBar.style.width = `${(stat.value / stat.max) * 100}%`;
        listItem.appendChild(statBar);
        statsList.appendChild(listItem);
    });

    pokemonImage.src = pokemon.photo;

    pokemonName.textContent = pokemon.name;

    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    pokemonAba.style.display = 'block';
}


function closeAba() {
    const aba = document.getElementById('pokemonAba');
    aba.style.display = 'none';
}

window.onclick = function (event) {
    const aba = document.getElementById('pokemonAba');
    if (event.target === aba) {
        aba.style.display = 'none';
    }
};

document.addEventListener('click', function (event) {
    const statsBtn = event.target.closest('.stats-btn');
    if (statsBtn) {
        const pokemonData = JSON.parse(statsBtn.dataset.pokemon);
        displayPokemonStats(pokemonData);
    }
});