
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

    pokemon.moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)
    pokemon.stats = pokeDetail.stats.map((statsSlot) => {
        return {
            name: statsSlot.stat.name,
            stat: statsSlot.base_stat
        }
    })

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

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

pokeApi.getPkm = (pkmId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pkmId}`;

    const pkm = { url: url  };

    return pokeApi.getPokemonDetail(pkm)
        .then((pokemonsDetails) => pokemonsDetails)
        
}
