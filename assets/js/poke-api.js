const pokeApi =  {};

function convetPokeApiDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [mainType] = types;

    pokemon.mainType = mainType;
    pokemon.types = types;
    pokemon.image = pokemonDetail.sprites.other['official-artwork'].front_default

    return pokemon
}

pokeApi.getpokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convetPokeApiDetailToPokemon)
}

pokeApi.getPokemons =  (offset = 0, limit = 5) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jasonBody) => jasonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getpokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonList) => pokemonList)
}