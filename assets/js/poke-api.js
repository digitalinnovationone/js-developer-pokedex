
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    convertArrayStatsToObject(pokeDetail, pokemon)
    pokemon.types = types
    pokemon.type = type
,
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


function convertArrayStatsToObject(pokeDetail, pokemon) {
    const atrArray = [
        "hp",
        "attack",
        "defense",
        "sp_atk",
        "sp_def",
        "speed",
    ]
    const arrayStats = pokeDetail.stats.map((statsValue) => statsValue.base_stat)
    for (i = 0; i < arrayStats.length; i++) {
        pokemon.stats[atrArray[i]] = arrayStats[i]
    }

}


function convertToChainEvolution(chainEvolution) {
    let chainEvolutionArray = [];
    chainEvolutionArray.push(chainEvolution.species.name);

    let nextEvo = nextEvolution(chainEvolution);
   
    while (nextEvo != 0) {
        chainEvolutionArray.push(nextEvo.species.name);
        nextEvo = nextEvolution(nextEvo);
   }
   
   return chainEvolutionArray;
}

function nextEvolution(chainEvo) {
    if (chainEvo.evolves_to.length != 0) return chainEvo.evolves_to[0];
    else return 0;
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

pokeApi.getPokemon = (idPokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}` 
    return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getEvolutionChain = (idPokemon) => {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`

	return fetch(url)
	.then((response) => response.json())
	.then((jsonBody) => jsonBody.evolution_chain.url)
    .then((evoChainUrl) => 
        fetch(evoChainUrl)
            .then((resp) => resp.json())
            .then((evoChain) => convertToChainEvolution(evoChain.chain))
    )
} 

pokeApi.getFlavorText = (idPokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => selectLang(jsonBody.flavor_text_entries))
    
}


function selectLang(flavor_text_entries) {
    let flavorText;
    flavor_text_entries.map((item) => {
        if (item.language.name === "en" && item.version.name === "blue")
            flavorText = item.flavor_text;
    })

    return flavorText;
}

