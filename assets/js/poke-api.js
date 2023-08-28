
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
function convertPokemonByIdToPokemon(pokemonDetails) {
    const pokemon = new Pokemon();
    pokemon.name = pokemonDetails.name;
    pokemon.number = pokemonDetails.id;
  
    const types = pokemonDetails.types.map((types) => types.type.name);
    const [type] = types;
  
    pokemon.mainType = type;
    pokemon.types = types;
    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;
    pokemon.baseExperience = pokemonDetails.base_experience;
    pokemon.height = pokemonDetails.height;
    pokemon.weight = pokemonDetails.weight;
  
    const stats = pokemonDetails.stats.map((stats) => {
        return {
            name: stats.stat.name,
            number: stats.base_stat,
        };
    });
  
    pokemon.stats = stats;
  
    return pokemon;
  }
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
    return fetch(url)
        .then((res) => res.json())
        .then((responseBody) => convertPokemonByIdToPokemon(responseBody))
        .then((pokemonDetails) => pokemonDetails);
  }