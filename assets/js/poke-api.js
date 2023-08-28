const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.height = parseFloat((pokeDetail.height * 0.1).toFixed(2));
  pokemon.weight = parseFloat((pokeDetail.weight * 0.1).toFixed(2));

  const abilities = pokeDetail.abilities.map((abilitySlot => abilitySlot.ability.name ))
  const [ability] = abilities;

  pokemon.abilities = abilities
  pokemon.ability = ability

  const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
  const [ statHP, statAttack, statDeffense, statSpecialAttack, statSpecialDefense, statSpeed] = stats

  pokemon.hp = statHP
  pokemon.attack = statAttack
  pokemon.deffense = statDeffense
  pokemon.specialAttack = statSpecialAttack
  pokemon.specialDefense = statSpecialDefense
  pokemon.speed = statSpeed
  pokemon.total =  statHP + statAttack + statDeffense + statSpecialAttack + statSpecialDefense + statSpeed


  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonDetailPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonParamId = urlParams.get("id");

  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonParamId}`)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};
