const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.peso = pokeDetail.weight;
  pokemon.altura = pokeDetail.height;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.stats.hp = pokeDetail.stats.find((item) => item.stat.name === "hp");
  pokemon.stats.atk = pokeDetail.stats.find(
    (item) => item.stat.name === "attack"
  );

  pokemon.stats.def = pokeDetail.stats.find(
    (item) => item.stat.name === "defense"
  );
  pokemon.stats.sAtk = pokeDetail.stats.find(
    (item) => item.stat.name === "special-attack"
  );

  pokemon.stats.sDef = pokeDetail.stats.find(
    (item) => item.stat.name === "special-defense"
  );
  pokemon.stats.spd = pokeDetail.stats.find(
    (item) => item.stat.name === "speed"
  );

  pokemon.photo = pokeDetail.sprites.other.showdown.front_default;

  return pokemon;
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

pokeApi.getPokemonByID = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => convertPokeApiDetailToPokemon(data));
};
