const pokeApi = {}

pokeApi.getPokemons= function(offset= 0, limit=20){
   
 const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
 return fetch(url)

 .then((response) => response.json())
 .then((jsonBody) => jsonBody.results)
 .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
 .then((detailRequests) => Promise.all(detailRequests))
 .then((pokemonsDetails) => pokemonsDetails)
}

function convertPokeApiDetailtoPokemon(pokeDetail) {
     const pokemon = new Pokemon()
     pokemon.number  = pokeDetail.id
     pokemon.name = pokeDetail.name

   const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
   const [type]= types

     pokemon.types =  types
     pokemon.type = type

     pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default
     pokemon.height = pokeDetail.height
     pokemon.weight = pokeDetail.weight

     return pokemon
}

 pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
     .then((response) => response.json())
     .then(convertPokeApiDetailtoPokemon)
}
