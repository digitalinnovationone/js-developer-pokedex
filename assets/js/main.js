const pokemonContainer = document.getElementById('pokemonList')
const btnTop = document.getElementById('btnTop');

const limit = 12;
let offset = 0;

function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

window.onload = function () { scrollFunction() };

window.onscroll = function () { scrollFunction() };

window.addEventListener('scroll', debounce(onScroll, 100));

function onScroll() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        loadMorePokemons();
    }
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

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonList.map((pokemon) => {
            const newPokemon = convertPokemonToLi(pokemon);
            pokemonContainer.appendChild(newPokemon);
            newPokemon.addEventListener('click', () => {
                window.location.href = `details.html?id=${pokemon.number}`;
            });
        });

    });
}

loadPokemons(offset, limit);

function loadMorePokemons() {
    offset += limit;
    const newLimit = offset + limit;
    loadPokemons(offset, newLimit);
}
