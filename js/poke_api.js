
const pokeapi = {}

function ConverterPokeApi (pokeDetail) {
    const pokemon = new Pokemon ()
    pokemon.numero = pokeDetail.id
    pokemon.nome = pokeDetail.name
    
    const types = pokeDetail.types.map ((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    pokemon.foto = pokeDetail.sprites.front_default

    return pokemon
}



pokeapi.getPokemonDetail = (pokemon) => {
    return fetch (pokemon.url)
            .then((response) => response.json())
            .then (ConverterPokeApi)
}

pokeapi.getPokemons = (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
    /*Fornece o objeto convertido */
    .then ((response) => response.json ())
    .then ((jsonBody) => jsonBody.results)
    .then ((pokemons) => pokemons.map((pokeapi.getPokemonDetail)))
    .then ((detailRequests) => Promise.all (detailRequests))
    .then ((pokemonsDetails) => pokemonsDetails)
}