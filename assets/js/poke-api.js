const pokeApi = {};

pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
        .then(response => response.json()) // retorna cada busca dos detalhes de cada pokemon e retorna eles em json
        .then(convertPokemonToPokemonModel);
};

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url) // busca a lista de pokemons
        .then(response => response.json()) // retorna a lista de pokemons em json
        .then(jsonBody => jsonBody.results) // acessamos o resultado da lista
        .then(pokemons => pokemons.map(pokeApi.getPokemonDetail)) // faz a chamada da funcao que retorna uma lista de promises passando por parametro a lista de pokemons
        .then(detailRequest => Promise.all(detailRequest)) // retorna todas as promises
        .then(pokemonDetails => pokemonDetails) // retorna os detalhes de cada pokemon
        .catch(error => console.error(error));
};

pokeApi.getInfoPokemon = id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.stats);
};
