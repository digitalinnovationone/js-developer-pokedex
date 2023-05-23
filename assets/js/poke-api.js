const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const[type] = types
    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const[ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    const stats = pokeDetail.stats.map((baseStat) => (baseStat.stat.name + ' | ' + baseStat.base_stat))
    pokemon.stats = stats

    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

pokeApi.getPokemonInfo = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokemonApiDetailToPokemon)
        .catch((error) => console.error(error))
}