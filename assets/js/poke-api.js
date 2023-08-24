const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.abilities = pokeDetail.abilities;
    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.stats = pokeDetail.stats;

    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat


    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 8) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => {
            // Mapeia cada Pokémon e inclue a URL completa da página HTML
            const pokemonDetailsPromises = pokemons.map((pokemon) => {
                const pokemonDetail = pokeApi.getPokemonDetail(pokemon);
                pokemonDetail.htmlPageUrl = `/pages/pokemon.html?${pokemon.name}`; // Adiciona a URL completa
                return pokemonDetail;
            });
            return Promise.all(pokemonDetailsPromises);
        })
        .catch((error) => console.error(error))
}