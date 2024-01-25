const pokeApi= {};

function convertPokeApiDetailToPokemon(pokeDetail, infoSpecies){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.description = infoSpecies?.flavor_text_entries[0]?.flavor_text;

    pokemon.stats.hp = pokeDetail.stats.find((item) => item.stat.name === "hp");
    pokemon.stats.atk = pokeDetail.stats.find(
      (item) => item.stat.name === "attack"
    );
    pokemon.stats.def = pokeDetail.stats.find(
      (item) => item.stat.name === "defense"
    );
    pokemon.stats.sAtk = pokeDetail.stats.find(
      (item) => item.stat.name === "special-attack"
    );
    pokemon.stats.sDef = pokeDetail.stats.find(
      (item) => item.stat.name === "special-defense"
    );
    pokemon.stats.spd = pokeDetail.stats.find(
      (item) => item.stat.name === "speed"
    );

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then ((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons =  async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    try {
      const response = await fetch(url);
      const jsonBody = await response.json();
      const pokemons = jsonBody.results;

      const detailRequests = pokemons.map((pokemon) =>
        pokeApi.getPokemonDetail(pokemon)
      );
      const pokemonsDetails = await Promise.all(detailRequests);

      return pokemonsDetails;
    } catch (error) {
      console.error("Erro ao obter pokémons:", error);
      throw error;
    }
}