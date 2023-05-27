const pokeApi = {}

function convertPokeApiToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  pokemon.abilities = pokeDetail.abilities
  pokemon.height = pokeDetail.height
  pokemon.weight = pokeDetail.weight
  pokemon.gene = pokeDetail.genus
  // console.log(pokemon.gene)
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const type = types[0]

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}


pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetail) => pokemonsDetail)
}

pokeApi.getPokemon = (offsetDetail = 0, limitDetail = 1) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offsetDetail}&limit=${limitDetail}`
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetail) => pokemonsDetail)
}

//todo

// pokeApi.getPokemon = (offsetDetail = 0) => {
//   const url = `https://pokeapi.co/api/v2/pokemon-species/${offsetDetail}`
//   return fetch(url)
//     .then((response) => response.json())
//     .then((jsonBody) => jsonBody.results[0].url)
//     .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
//     .then((detailRequests) => Promise.all(detailRequests))
//     .then((pokemonsDetail) => console.log(pokemonsDetail))
// }
