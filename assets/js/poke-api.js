
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

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getDetails = async (pokeName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    return await fetch(url)
        .then((response) => response.json())
        .then((body) => {
            const pokemon = {
                name: body.name,
                hp: body.stats[0].base_stat,
                attack: body.stats[1].base_stat,
                deffense: body.stats[2].base_stat,
                specialAttack: body.stats[3].base_stat,
                specialDefense: body.stats[4].base_stat,
                speed: body.stats[5].base_stat,
                image: body.sprites.other.dream_world.front_default
            }
            return pokemon;
        })
        .catch((e) => console.log(e));
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
