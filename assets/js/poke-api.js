
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertDataToModal(pokeData) {
    const pokemon = new PokemonStatus()

    const types = pokeData.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.id = pokeData.id;
    pokemon.name = pokeData.name;
    pokemon.weight = pokeData.weight;
    pokemon.height = pokeData.height;
    pokemon.type = type;
    pokemon.abilities = pokeData.abilities[0];
    pokemon.attack = pokeData.stats[1].base_stat;
    pokemon.defense = pokeData.stats[2].base_stat;
    pokemon.speed = pokeData.stats[5].base_stat;
    pokemon.image = pokeData.sprites.other.dream_world.front_default;
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

pokeApi.getSinglePokemon = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => convertDataToModal(jsonBody))
    .then(res => res)
}

pokeApi.getDescription = async (order) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${order}/`
    return await fetch(url).then(res => res.json()).then(data => data.flavor_text_entries[0].flavor_text)
}
