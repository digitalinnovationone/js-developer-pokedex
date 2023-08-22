const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    const {
      id: number,
      name,
      types,
      abilities,
      weight,
      height,
      sprites: {
        other: {
          dream_world: { front_default: photo }
        }
      }
    } = pokeDetail;
    const [type] = types.map(typeSlot => typeSlot.type.name);
   
    Object.assign(pokemon, {
      number,
      name,
      weight,
      height,
      abilities: abilities.map(abilitieSlot => abilitieSlot.ability.name),
      types: types.map(typeSlot => typeSlot.type.name),
      type,
      photo
    });
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

pokeApi.getIndividual = (el) => {
  const pokemonClicado = el.childNodes[3].textContent;
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonClicado}`)
    .then((res) => res.json())
    .then(convertPokeApiDetailToPokemon)
    .then(data=>pokemonList.innerHTML=criaHtmlModal(data))
};
