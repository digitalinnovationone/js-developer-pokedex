const pokeApi =  {};

function convetPokeApiDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    pokemon.weight = pokemonDetail.weight*0.1
    pokemon.height = pokemonDetail.height*10

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [mainType] = types;

    pokemon.mainType = mainType;
    pokemon.types = types;
    pokemon.image = pokemonDetail.sprites.other['official-artwork'].front_default

    pokemon.speciesUrl = pokemonDetail.species.url

    const abilities = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name) 
    pokemon.abilities = abilities.join(', ')

    return pokemon
}


function appendSpeciesDetails(pokemonSpeciesDetail, pokemon){
    const _pokemon = pokemon
    return pokemonSpeciesDetail.then( (pokemonSpeciesDetail) => 
        _pokemon.eggGroup = pokemonSpeciesDetail.egg_groups.map((eggGroupSlot) => eggGroupSlot.name).join(', ')
    ).then( () => _pokemon)

    
}

pokeApi.getpokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convetPokeApiDetailToPokemon)
}

pokeApi.getPokemons =  (offset = 0, limit = 5) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jasonBody) => jasonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getpokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonList) => pokemonList)
}

pokeApi.getPokemon = (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

    return fetch(url)
    .then((response) => response.json())
    .then(convetPokeApiDetailToPokemon)
    .then((pokemon) => [fetch(pokemon.speciesUrl)
        .then((response) => response.json()), pokemon])
    .then((info) => appendSpeciesDetails(info[0], info[1]))
}