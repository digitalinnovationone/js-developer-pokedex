
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    // debugger;
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = getPhoto(pokeDetail);

    return pokemon
}

function getPhoto(pokeDetail) {
    return pokeDetail.sprites.other.dream_world.front_default || 'assets/images/pokeball.png';
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

pokeApi.getAllPokemons = (name = 'char') => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1281`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((paginas) => paginas.filter((pokemon) => pokemon.name.match(name)))
        .then((filteredPokemons) => filteredPokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}