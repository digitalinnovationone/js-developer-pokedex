const pokeApi = {}

function convertPokeApiToPokemon(pokemonDetails) {
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetails.order;
    pokemon.name = pokemonDetails.name;

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default;
    pokemon.ability = pokemonDetails.abilities.map((ability) => ability.ability.name);
    pokemon.weight = pokemonDetails.weight;
    pokemon.height = pokemonDetails.height;

    pokemon.stats = {
        hp: pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat,
        specialAttack: pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
        specialDefense: pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
        speed: pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat,
    };

    return pokemon;
}

pokeApi.getDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemon);  
}

pokeApi.getPokemons = function(offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => (pokemonDetails))
        .catch(function(error) {
            console.error(error);
        });
}
