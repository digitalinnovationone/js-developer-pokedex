const pokeApi = {}

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

pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails);
}
