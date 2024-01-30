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

  pokemon.attack = pokeDetail.stats.find(
    (stat) => stat.stat.name === "attack"
  ).base_stat;
  pokemon.hp = pokeDetail.stats.find(
    (stat) => stat.stat.name === "hp"
  ).base_stat;
  pokemon.defense = pokeDetail.stats.find(
    (stat) => stat.stat.name === "defense"
  ).base_stat;
  pokemon.speed = pokeDetail.stats.find(
    (stat) => stat.stat.name === "speed"
  ).base_stat;

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
