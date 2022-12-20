const pokeApi = {}

pokeApi.getPokemonsArr = (offset, limit) => {
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemonsArr) => pokemonsArr.map((pokemon) => pokeApi.getPokemonsDetail(pokemon)))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error('error'))

    // pokemonsArr.map(pokeApi.getPokemonsDetail)
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((pokemon) => convertPokeAoiDetailtoPokemon(pokemon))
                            
}

function convertPokeAoiDetailtoPokemon(pokeDetail){

    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.ability = pokemon.abilities.length > 1 ? pokemon.abilities[0] + ' & ' + pokemon.abilities[1] : pokemon.abilities[0];
    pokemon.moves = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.move = pokemon.moves.length > 1 ? pokemon.moves[0] + ' & ' + pokemon.moves[1] : pokemon.moves[0] ;

    
    return pokemon
    
}


