
const pokeApi = {}

function convertPokeApi(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.base_experience = pokeDetail.base_experience
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilityData) => abilityData.ability.name);
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    const moves = pokeDetail.moves.map((movesData) => movesData.move.name);
    const [move] = moves
    pokemon.moves = moves
    pokemon.move = move

 
    const stats = pokeDetail.stats.map((statsData) => ({
        stat: statsData.stat.name,
        base_stat: statsData.base_stat
      }));
    const [stat] = stats
    pokemon.stats = stats
    pokemon.stat = stat
    

    

    

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
