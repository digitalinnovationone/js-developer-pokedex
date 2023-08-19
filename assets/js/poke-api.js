const apiVersion = 'v2';
const source = 'pokemon'

const  pokeApi = {};

function convertPokeApiDetailsToPokemon(pokemonDetails) {
    // debugger

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name);
    const [mainType] = types

    return new Pokemon(
        pokemonDetails.id,
        pokemonDetails.name,
        types,
        mainType,
        pokemonDetails.image = pokemonDetails.sprites.other.dream_world.front_default
    );
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
                            .then((response) => response.json())
                            .then(convertPokeApiDetailsToPokemon);
}

pokeApi.getAll = (offset = 0, limit = 5) => {
    const URL = `https://pokeapi.co/api/${apiVersion}/${source}?offset=${offset}&limit=${limit}`;
    
    return fetch(URL)
            .then((response) => response.json())
            .then((responseBodyToJson) => responseBodyToJson.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailsRequests) => Promise.all(detailsRequests))
            .then((pokemonsDetails) => pokemonsDetails)
            .catch(function (error){
                console.log(error)
            });
}
