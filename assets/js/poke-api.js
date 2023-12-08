const pokeApi = {};

function convertPokeApiDetail(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((res) => res.json()).then(convertPokeApiDetail)
};



pokeApi.getPokemons = (offset = 0, limit = 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => res.map(pokeApi.getPokemonDetail))
    .then((detailReq) => Promise.all(detailReq))
    .then((pokemonDetails) => pokemonDetails)
    .catch((err) => console.error(err));
  };
  
  pokeApi.getPokemons().then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToList).join("");
    pokeList.innerHTML = newHtml;
  });
  