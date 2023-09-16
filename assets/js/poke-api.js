const pokeApi = {}

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
    try {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
            throw new Error('Unable to retrieve Pokémon details.');
        }
        const pokeDetail = await response.json();
        return convertPokeApiDetailToPokemon(pokeDetail);
    } catch (error) {
        console.error('Unable to retrieve Pokémon details:', error);
        throw error;
    }
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Unable to retrieve the list of Pokémon.');
        }
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;
        const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
        return Promise.all(detailRequests);
    } catch (error) {
        console.error('Error while fetching the list of Pokémon:', error);
        throw error;
    }
}

