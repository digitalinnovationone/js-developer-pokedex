const PokeApi = {}
const PokemonsData = {}

function convertPokemonToPokemonModel(pokemonJson){
    console.log(pokemonJson)
    const pokemon = new Pokemon()
    pokemon.number = pokemonJson.id
    pokemon.name = pokemonJson.name
    pokemon.image = pokemonJson.sprites.front_default

    const types = pokemonJson.types.map(slot => slot.type.name)
    pokemon.types = types
    const [type] = types
    pokemon.type = type

    const abilities = pokemonJson.abilities.map(slot => slot.ability.name)
    pokemon.abilities = abilities

    PokemonsData[pokemon.number] = pokemon
    return pokemon
}

PokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then(response => response.json())
        .then(responseBody => responseBody.results)
        .then(pokemons => pokemons.map(pokemon => fetch(pokemon.url)
                                                    .then(response => response.json())
                                                    .then(pokeJson => convertPokemonToPokemonModel(pokeJson))))
        .then(listRequestsToJson => Promise.all(listRequestsToJson))
        .catch((error) => console.error(error))
}