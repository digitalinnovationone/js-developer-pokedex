const formatPokemonModel = ({ id, name, types, sprites, height, weight, abilities, stats }) => {
  const pokemon = new PokemonModel();
  pokemon.order = id;
  pokemon.name = name.charAt(0).toUpperCase() + name.slice(1);
  pokemon.types = types.map(({type}) => type.name);
  pokemon.type = pokemon.types[0];
  pokemon.img = sprites.other["official-artwork"].front_default;
  pokemon.height = height;
  pokemon.weight = weight;
  pokemon.abilities = abilities.map(({ability}) => ability.name);
  pokemon.status = stats.reduce((acc, {stat, base_stat}) => {
    acc[stat.name] = base_stat;
    return acc;
  }, {});

  return pokemon;
}

const requestPokeDetails = async (url) => {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();
    return formatPokemonModel(pokemon);
  } catch (error) {
    console.log(error.message);
  }
}

const requestPokeApi = async (offset = 0, limit = 10) => {
  const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(endpoint);
    const { results } = await response.json();
    const pokemonDetails = await Promise.all(results.map(({ url }) => requestPokeDetails(url)));
    return pokemonDetails;
  } catch (error) {
    console.log(error.message);
  }
};
