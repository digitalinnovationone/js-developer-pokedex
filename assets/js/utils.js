function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

    pokemon.types = types;
    pokemon.type = types[0];

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height;

    pokemon.weight = pokeDetail.weight;

    pokemon.stats = pokeDetail.stats.map((statSlot) => ({
        name: statSlot.stat.name,
        value: statSlot.base_stat
    }));
    return pokemon;
}

function createElement(elementName, attributes){
    const element = document.createElement(elementName);
    const attributesAsArray = Object.entries(attributes);

    attributesAsArray.forEach(([key, value]) => element.setAttribute(key, value));

    return element;
}

function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function scrollFunction() {
    if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
        btnTop.classList.remove('hide');
    } else {
        btnTop.classList.add('hide');
    }
}

function convertPokemonToLi(pokemon) {
    const pokemonLi = createElement('li', {
        class: `pokemon ${pokemon.type}`
    });

    const pokemonNumber = createElement('span', {
        class: 'number'
    });
    pokemonNumber.textContent = `#00${pokemon.number}`;
    pokemonLi.appendChild(pokemonNumber);

    const pokemonName = createElement('span', {
        class: 'name'
    });
    pokemonName.textContent = pokemon.name;
    pokemonLi.appendChild(pokemonName);

    const pokemonDetails = createElement('div', {
        class: 'detail'
    });

    const pokemonTypes = createElement('ol', {
        class: 'types'
    });

    pokemon.types.map((type) => {
        const pokemonType = createElement('li', {
            class: `type ${type}`
        });
        pokemonType.textContent = type;
        pokemonTypes.appendChild(pokemonType);
    });

    const pokemonImage = createElement('img', {
        src: pokemon.photo,
        alt: pokemon.name
    });

    pokemonDetails.appendChild(pokemonTypes);
    pokemonDetails.appendChild(pokemonImage);
    pokemonLi.appendChild(pokemonDetails);

    return pokemonLi;
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