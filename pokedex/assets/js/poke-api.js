const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
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

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}


function convertPokeApiDetailToCard(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  pokemon.abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
  

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  
  pokemon.types = types
  pokemon.type = type

  pokemon.totalStats = 0

  pokeDetail.stats.forEach(stats => {

    const itemName = stats.stat.name;
    const itemValue = stats.base_stat;

    pokemon.stats[itemName] = itemValue;
    pokemon.totalStats += itemValue;
    
  });

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon

}

pokeApi.getPokemonCardDetail = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  
  return fetch(url)
  .then((response) => response.json())
  .then(convertPokeApiDetailToCard)
}
