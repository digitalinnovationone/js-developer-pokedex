
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
    pokemon.alternativePhoto = pokeDetail.sprites.other.home.front_default
    pokemon.stats = pokeDetail.stats;

    return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
    try {
        const response = await fetch(pokemon.url);
        const pokeDetail = await response.json();
        const convertedPokemon = convertPokeApiDetailToPokemon(pokeDetail);
        return convertedPokemon;
    } catch (error) {
        console.error('Error fetching Pokemon detail:', error);
        return null; // Ou outra maneira de lidar com o erro, como lançar uma exceção
    }
};


pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;

        const detailRequests = pokemons.map(pokemon => pokeApi.getPokemonDetail(pokemon));
        const pokemonsDetails = await Promise.all(detailRequests);

        return pokemonsDetails;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        return [];
    }
};
