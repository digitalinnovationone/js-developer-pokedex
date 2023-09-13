const pokeAPI = {};

function convertPokeApiDetailToPokemon(pokeDatail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDatail.id;
  pokemon.name = pokeDatail.name;
  const types = pokeDatail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDatail.sprites.other.dream_world.front_default;
  return pokemon;
}

pokeAPI.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((respost) => respost.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetail) => pokemonDetail);
};

