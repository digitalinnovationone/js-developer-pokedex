
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

pokeApi.getPokemonDetailToMoidal = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then(setDetailsPokemon);
}

function setDetailsPokemon(pokeDetail) {
    return new Promise((resolve, reject) => {
        const pokemon = new Pokemon();

        fetch(pokeDetail.species.url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                pokemon.number = pokeDetail.id;
                pokemon.name = pokeDetail.name;

                const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
                const [type] = types;

                pokemon.types = types;
                pokemon.type = type;

                pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
                pokemon.moves = pokeDetail.moves;
                pokemon.height = pokeDetail.height;
                pokemon.weight = pokeDetail.weight;
                pokemon.abilities = pokeDetail.abilities;
                pokemon.species =  data.name;

                resolve(pokemon);
            })
            .catch((error) => {
                console.error('Erro ao buscar informações da espécie do Pokémon:', error);
                reject(error);
            });
    });
}

