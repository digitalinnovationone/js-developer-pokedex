
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

    const skills = pokeDetail.abilities.map((skillsSlot) => skillsSlot.ability.name)
    const [skill1, skill2 = 'not have 2nd skill'] = skills 
    pokemon.skill1 = skill1  
    pokemon.skill2 = skill2

    const statsValues = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat) 
    const [statValueHp, statValueAtk, statValueDef, statValueSatk, statValueSdef, statValueSpd] = statsValues

    pokemon.statValueHp = statValueHp 
    pokemon.statValueAtk = statValueAtk
    pokemon.statValueDef = statValueDef
    pokemon.statValueSatk = statValueSatk
    pokemon.statValueSdef = statValueSdef
    pokemon.statValueSpd = statValueSpd

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

pokeApi.getPokemonModal = async (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`
    const response = await fetch(url);
    const pokeDetail = await response.json();
    const pokemonDetail = convertPokeApiDetailToPokemon(pokeDetail);

    openModal();
    
    return pokemonDetail;
}
