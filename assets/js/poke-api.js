
const pokeApi = {}

let numPokemon;

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

    
function convertPokeApiDetailToPokemonFull(pokeDetail) {
    const pokemonFull = new PokemonFull()
    pokemonFull.number = pokeDetail.id;
    pokemonFull.name = pokeDetail.name;
    pokemonFull.base_experience = pokeDetail.base_experience;

    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonFull.types = types
    pokemonFull.type = type
    
    const abilities = pokeDetail.abilities.map((AbilitySlot) => AbilitySlot.ability.name)
    pokemonFull.abilities = abilities
    const [ability] = abilities
    pokemonFull.ability = ability
            
    pokemonFull.hp = pokeDetail.stats[0].base_stat;
    
    pokemonFull.attack = pokeDetail.stats[1].base_stat;
    pokemonFull.defense = pokeDetail.stats[2].base_stat;
    pokemonFull.specialAttack= pokeDetail.stats[3].base_stat;
    pokemonFull.specialDefense = pokeDetail.stats[4].base_stat;
    pokemonFull.speed = pokeDetail.stats[5].base_stat;
    pokemonFull.weight = pokeDetail.weight;

    pokemonFull.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemonFull
    }
    
    pokeApi.getPokemonDetail = (pokemon) => {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
    }
    
    pokeApi.getPokemons = (offset = 151, limit = 151) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
    }

    pokeApi.getPokemonFull = (offset, limit =1) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonFullDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
    }

pokeApi.getPokemonFullDetail = (pokemonFull) => {
    return fetch(pokemonFull.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonFull)
}