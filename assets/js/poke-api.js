const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  if (pokeDetail.abilities) {
    const abilities = pokeDetail.abilities.map(
      (abilitySlot) => abilitySlot.ability.name
    );
    const [ability] = abilities;

    pokemon.abilities = abilities;
    pokemon.ability = ability;
  }

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  pokemon.photoShiny = pokeDetail.sprites.front_shiny
  return pokemon;
};

pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const pokeDetail = await response.json() 
    return convertPokeApiDetailToPokemon(pokeDetail)
};

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequests = pokemons.map(async (poke) => await pokeApi.getPokemonDetail(poke))
    
    return Promise.all(detailRequests)
    
};

pokeApi.convertPokemonToDetail = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url)
  const pokemon = await response.json()

  return convertPokeApiDetailToPokemon(pokemon)
    
};
