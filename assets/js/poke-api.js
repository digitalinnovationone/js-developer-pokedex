import Pokemon from "./pokemon-model.js";

const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  return pokemon;
}

const getPokemonDetail = async ({ url }) => {
  const data = await fetch(url);
  const response = await data.json();

  return convertPokeApiDetailToPokemon(response);
};

export const getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const data = await fetch(url);
  const response = await data.json();

  const { results } = response;

  const pokemons = await Promise.all(results.map((p) => getPokemonDetail(p)));
  return pokemons;
};