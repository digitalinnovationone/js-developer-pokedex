
const pokeApi = {}
const Pokemons = {}
let loader = document.querySelector('.loader');

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.icon = pokeDetail.sprites.other["official-artwork"].front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities
    pokemon.stats = pokeDetail.stats
    Pokemons[pokemon.name] = pokemon
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  // Mostra a animação de carregamento
  loader.style.display = "block";

  try {
    const response = await fetch(url);
    const jsonBody = await response.json();
    const pokemons = jsonBody.results;

    const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
    const pokemonsDetails = await Promise.all(detailRequests);

    // Oculta a animação de carregamento
    loader.style.display = "none";

    return pokemonsDetails;
  } catch (error) {
    console.error("Erro:", error);

    // Oculta a animação de carregamento em caso de erro
    loader.style.display = "none";
  }
};
