const pokeApi = {};

class PokeAPI {
  static async getPokemonDetails(pokemon) {
    const rawDetails = await fetch(pokemon.url);
    const parsedDetails = await rawDetails.json();
    const entityPokemon = convertPokeApiDetailToPokemon(parsedDetails);
    return entityPokemon;
  }
  static async getPokemons(offset = 0, limit = 5) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    const response = await fetch(url);
    const parsedResponse = await response.json();
    const pokemonList = parsedResponse.results;
    const pokemonsDetails = await Promise.all(
      pokemonList.map(PokeAPI.getPokemonDetails)
    );
    return pokemonsDetails;
  }
}

function convertPokeApiDetailToPokemon(pokeDetail) {
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
