const pokeApi = {};

function convertPokeDetails(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.types = types;
  const [type] = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  pokemon.height = pokeDetail.height
  pokemon.weight = pokeDetail.weight
  pokemon.move = pokeDetail.abilities[0].ability.name
  pokemon.hp = pokeDetail.stats[0].base_stat
  pokemon.attack = pokeDetail.stats[1].base_stat
  pokemon.defense = pokeDetail.stats[2].base_stat
  pokemon.specialAtt = pokeDetail.stats[3].base_stat
  pokemon.specialDef = pokeDetail.stats[4].base_stat
  pokemon.speed = pokeDetail.stats[5].base_stat
  return pokemon;
}

pokeApi.getPokeDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeDetails);
};

pokeApi.getPokemons = (offset = 0, limit = 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokeDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokeDetails) => pokeDetails)
    .catch((error) => console.log(error));
};
