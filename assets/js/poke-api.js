const pokeApi = {};

pokeApi.getPokemonDetail = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return await response.json();
};

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const response = await fetch(url);

  const jsonBody = await response.json();

  return jsonBody.results;
};
