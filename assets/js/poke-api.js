const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail, infoSpecies) {
    const pokemon = new Pokemon()
    pokemon.numPokemon = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.description = infoSpecies?.flavor_text_entries[0]?.flavor_text
  
    pokemon.stats.hp = pokeDetail.stats.find((item) => item.stat.name === 'hp')
    pokemon.stats.atk = pokeDetail.stats.find((item) => item.stat.name === 'attack')

    pokemon.stats.def = pokeDetail.stats.find((item) => item.stat.name === 'defense')
    pokemon.stats.sAtk = pokeDetail.stats.find((item) => item.stat.name === 'special-attack')

    pokemon.stats.sDef = pokeDetail.stats.find((item) => item.stat.name === 'special-defense')
    pokemon.stats.spd = pokeDetail.stats.find((item) => item.stat.name === 'speed')
  
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

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    try {
        const response = await fetch(url)
        const jsonBody = await response.json()
        const pokemons = jsonBody.results
    
        const detailRequests = pokemons.map((pokemon) =>
          pokeApi.getPokemonDetail(pokemon)
        )
        const pokemonsDetails = await Promise.all(detailRequests)
    
        return pokemonsDetails
      } catch (error) {
          console.error("Falha ao recuperar informações sobre os Pokémon:", error)
          throw error
      }
}