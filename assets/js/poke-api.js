
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.hp = pokeDetail.stats.find((stat) => stat.stat.name === 'hp').base_stat;
    pokemon.attack = pokeDetail.stats.find((stat) => stat.stat.name === 'attack').base_stat;
    pokemon.defense = pokeDetail.stats.find((stat) => stat.stat.name === 'defense').base_stat;
    pokemon.speed = pokeDetail.stats.find((stat) => stat.stat.name === 'speed').base_stat;
    pokemon.total = pokeDetail.stats.reduce((total, stat) => total + stat.base_stat, 0);
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetailById = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};
