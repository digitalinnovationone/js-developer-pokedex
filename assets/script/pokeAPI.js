const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name).join(', ');
    pokemon.abilities = abilities;

    const moves = pokeDetail.moves.map((movesSlot) => movesSlot.move.name).join(', ');
    pokemon.moves = moves;

    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.stat.name);
    pokemon.stats = stats;

    const indiceStat = pokeDetail.stats.map((slotIndiceStat) => slotIndiceStat.base_stat);
    pokemon.indiceStat = indiceStat;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

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

pokeApi.getPokemonByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon) //cria lista .json doos detalhes do pokemon
}



// const [stat] = stats;
// pokemon.stats = stats;
// pokemon.stat = stat