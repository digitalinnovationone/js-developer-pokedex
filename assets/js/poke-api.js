const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {

    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id

    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const Abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
    const Stats = pokeDetail.stats.map((stat) => stat.stat.name)
    StatsValue = pokeDetail.stats.map((value) => value.base_stat)

    pokemon.types = types
    pokemon.type = type
    pokemon.abilities = Abilities
    pokemon.stats = Stats
    pokemon.statsValue = StatsValue
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function fetchGender(pokeDetail){
    const pokemon = new Pokemon()

     fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeDetail.id}`)
    .then((response) => response.json())
    .then((value) => {
        pokemon.gender = value.gender_rate
        console.log(pokemon.gender)
    })

    return pokemon
    
}


pokeApi.getPokemonDetail = (pokemon) => {

    const Fetch = fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    
    return  Fetch
        
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

