const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  return new Pokemon(
    pokeDetail.id,
    pokeDetail.name,
    type,
    types,
    pokeDetail.sprites.other.dream_world.front_default,
    pokeDetail.stats
  );
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
