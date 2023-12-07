
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const detailsContainer = document.getElementById('pokeDetails');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
window.onload = () => {
    loadPokemon(id);
}

function createDetailsContainer(pokemon) {
    const card = createElement('div', {
        class: `pokemon-card ${pokemon.type}`
    });

    const cardHeader = createElement('div', {
        class: `card-header ${pokemon.type}`
    });
    const pokeName = document.createElement('h1');
    pokeName.textContent = capitalizeFirstLetter(pokemon.name);
    cardHeader.appendChild(pokeName);
    const pokeHP = document.createElement('span');
    pokeHP.textContent = `${pokemon.stats[0].value} HP`;
    cardHeader.appendChild(pokeHP);

    const cardBody = createElement('div', {
        class: 'card-body'
    });

    const pokemonTypes = createElement('div', {
        class: 'pokemon-types'
    });
    pokemon.types.map((type) => {
        const pokemonType = createElement('span', {
            class: `${type}`
        });
        pokemonType.textContent = type;
        pokemonTypes.appendChild(pokemonType);
    });
    cardBody.appendChild(pokemonTypes);

    const pokemonImg = createElement('div', {
        class: 'pokemon-img'
    });
    const img = createElement('img', {
        src: pokemon.photo,
        alt: pokemon.name
    });
    pokemonImg.appendChild(img);
    cardBody.appendChild(pokemonImg);

    const pokemonStats = createElement('ol', {
        class: `pokemon-stats ${pokemon.type}`
    });
    pokemon.stats.map((stat) => {
        const pokemonStat = createElement('li', {
            class: 'pokemon-stat'
        });
        const statName = createElement('span', {
            class: 'stat-name'
        });
        statName.textContent = stat.name;
        const statValue = createElement('span', {
            class: 'stat-value'
        });
        statValue.textContent = stat.value;
        pokemonStat.appendChild(statName);
        pokemonStat.appendChild(statValue);
        pokemonStats.appendChild(pokemonStat);
    });
    cardBody.appendChild(pokemonStats);

    const cardFooter = createElement('div', {
        class: 'card-footer'
    });
    const pokeHeight = document.createElement('span');
    pokeHeight.textContent = `Height ${pokemon.height}`;
    const pokeWeight = document.createElement('span');
    pokeWeight.textContent = `Weight ${pokemon.weight}`;
    cardFooter.appendChild(pokeHeight);
    cardFooter.appendChild(pokeWeight);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    return card;
}

function loadPokemon(id) {
    pokeApi.getPokemonById(id).then((pokemon) => {
        document.title = `Detalhes - ${capitalizeFirstLetter(pokemon.name)}`;
        const pokeInfo = createDetailsContainer(pokemon);
        detailsContainer.appendChild(pokeInfo);
    })
}
