const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.num = pokeDetail.order;
    pokemon.name = pokeDetail.name;

    pokemon.stats.hp = pokeDetail.stats.find((item) => item.stat.name === 'hp').base_stat;
    pokemon.stats.atk = pokeDetail.stats.find((item) => item.stat.name === 'attack').base_stat;
    pokemon.stats.def = pokeDetail.stats.find((item) => item.stat.name === 'defense').base_stat;
    pokemon.stats.sAtk = pokeDetail.stats.find((item) => item.stat.name === 'special-attack').base_stat;
    pokemon.stats.sDef = pokeDetail.stats.find((item) => item.stat.name === 'special-defense').base_stat;
    pokemon.stats.spd = pokeDetail.stats.find((item) => item.stat.name === 'speed').base_stat;

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

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
};

pokeApi.getPokemonStats = (pokemon) => {
    const statUrls = pokemon.stats.map((stat) => stat.stat.url);
    const statRequests = statUrls.map((url) => fetch(url).then((response) => response.json()));

    return Promise.all(statRequests)
        .then((statsData) => {
            const stats = statsData.reduce((acc, statData) => {
                const statName = statData.name;
                const baseStat = statData.base_stat;

                acc[statName] = {
                    baseStat: baseStat,
                    effort: statData.effort,
                };

                return acc;
            }, {});

            return {
                name: pokemon.name,
                stats: stats,
            };
        });
};


Promise.all([

]).then((results) => {
    console.log(results)
})