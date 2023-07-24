const pokemonList = document.getElementById('pokemonList');
const nextPageButton = document.getElementById('nextButton');
const prevPageButton = document.getElementById('prevButton');

let offset = 0;
let limit = 12;
const offsetLimit = 151;

nextPageButton.addEventListener('click', () => {
    offset += limit;
    const offsetTotal = offset + limit;
    if (offsetTotal >= offsetLimit) {
        const newLimit = offsetLimit - offset;
        nextPageButton.classList.add('hidden');
        window.scrollTo(0, 0);
        loadPokemonsItens(offset, newLimit);
    } else {
        window.scrollTo(0, 0);
        loadPokemonsItens(offset, limit);
    }
});

prevPageButton.addEventListener('click', () => {
    offset -= limit;
    window.scrollTo(0, 0);
    if (nextPageButton.classList.contains('hidden')) nextPageButton.classList.remove('hidden');
    loadPokemonsItens(offset, limit);
});

function convertPokemonToPokemonModel(pokemonDetails) {
    const pokemon = new Pokemon(
        pokemonDetails.id,
        pokemonDetails.name,
        pokemonDetails.types,
        pokemonDetails.sprites.other.home.front_default
    );
    return pokemon;
}

function loadPokemonsItens(offset, limit) {
    pokeApi
        .getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newList = pokemons
                .map(pokemon => {
                    return `
                    <li onClick="getInfoPokemon(${pokemon.id}, '${pokemon.name}', '${
                        pokemon.types
                    }')" class="pokemon ${pokemon.type.toLowerCase()}">
                        <div class="pokemon-header">
                            <p class="name">${pokemon.name}</p>
                            <p class="number">#${pokemon.id}</p>
                        </div>
                        <div class="details">
                            <ol class="types">
                                ${pokemon.types
                                    .map(type => `<li class="type ${type.toLowerCase()}" >${type}</li>`)
                                    .join('')}
                            </ol>
                            <img class="pokemon-img"
                                src=${pokemon.img}
                                alt=${pokemon.name}>
                        </div>
                    </li>`;
                })
                .join('');
            pokemonList.innerHTML = newList;
        })
        .catch(error => console.error(error));
    offset == 0 ? prevPageButton.classList.add('hidden') : prevPageButton.classList.remove('hidden');
}

function getInfoPokemon(id, name, types) {
    const newTypes = types.split(',');
    nextPageButton.classList.add('hidden');
    prevPageButton.classList.add('hidden');
    pokeApi
        .getInfoPokemon(id)
        .then(pokemonDetails => pokemonDetails.map(detail => newFunction(detail)))
        .then(detail =>
            detail.map(statsList => {
                return `
                <li class="stat">
                    <p class=${statsList.name.toLowerCase()}>${statsList.name}</p>
                    <p>${statsList.stat}</p>
                </li>
            `;
            })
        )
        .then(li => {
            let pokemon = `
            <div class="card  ${newTypes[0].toLowerCase()}">
                <div class="card-header">
                    <button onClick="back()" class="back" type="button"></button>
                    <h2 class="name">${name}</h2>
                    <p class="number">#${id}</p>
                </div>
                <div class="card-body">
                    <div class="card-details">
                        <ol class="card-types">
                            ${newTypes
                                .map(type => {
                                    return `<li class="type ${type.toLowerCase()}">${type}</li>`;
                                })
                                .join('')}
                        </ol>
                    </div>
                    <img class="card-img"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png"
                        alt="bulba">
                    <div class="card-info">
                        <ol class="stats">
                            ${li.join('')}
                        </ol>
                    </div>
                </div>
            </div>`;
            pokemonList.innerHTML = pokemon;
        });

    function newFunction(detail) {
        return { name: detail.stat.name, stat: detail.base_stat };
    }
}

function back() {
    nextPageButton.classList.remove('hidden');
    prevPageButton.classList.add('hidden');
    loadPokemonsItens(offset, limit);
}

loadPokemonsItens(offset, limit);
