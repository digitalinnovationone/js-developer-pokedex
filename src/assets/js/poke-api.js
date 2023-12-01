const pokeAPI = {};

async function convertPokeApiDetailPokemon(pokeDetail) {
  const pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.weight = pokeDetail.weight;
  pokemon.height = pokeDetail.height;
  pokemon.mainmove = pokeDetail.moves[0].move.name;
  pokemon.abi = pokeDetail.abilities[0].ability.name;
  pokemon.hp = pokeDetail.stats[0].base_stat;
  pokemon.atk = pokeDetail.stats[1].base_stat;
  pokemon.def = pokeDetail.stats[2].base_stat;
  pokemon.spcatk = pokeDetail.stats[3].base_stat;
  pokemon.spcdef = pokeDetail.stats[4].base_stat;
  pokemon.speed = pokeDetail.stats[5].base_stat;

  await fetch(pokeDetail.species.url)
    .then((res) => res.json())
    .then((story) => {
      story.flavor_text_entries.map((text) => {
        if (text.language.name === "en") {
          pokemon.story = text.flavor_text;
        }
      });
    });

  return pokemon;
}

pokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon);
};

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
  const urlAPI = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(urlAPI)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((err) => console.log(err));
};
