
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.abilities = abilities
    const moves = pokeDetail.moves.map((abilitySlot) => abilitySlot.move.name).slice(0, 6);
    pokemon.moves = moves


    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const others = pokeDetail.stats.map(({base_stat, effort}) => ({base_stat, effort}));
    pokemon.others = others
    pokemon.base_stats = pokeDetail.stats[0].base_stats

    return pokemon
}

pokeApi.getDetails = (endpoint) => {
    console.log(endpoint);
    return fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
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
