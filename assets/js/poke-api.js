
const pokeApi = {}

function convertPokeApiInfoToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    pokemon.base_experience = pokeDetail.base_experience

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiInfoDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.base_experience = pokeDetail.base_experience

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    pokemon.base_experience = pokeDetail.base_experience

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonInfo = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const pokeDetail = await response.json()
    return convertPokeApiInfoToPokemon(pokeDetail)
}


pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequests = pokemons.map(pokeApi.getPokemonInfo)
    const pokemonsDetails = await Promise.all(detailRequests)
    return pokemonsDetails
}

pokeApi.getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url)
    const pokemon = await response.json()

    return convertPokeApiInfoDetailToPokemon(pokemon)
}
