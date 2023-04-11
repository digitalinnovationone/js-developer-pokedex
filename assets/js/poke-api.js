let pokeApi = {};

/*Filtrando os dados recolhidos e convertendo dados para dados que inportam para o projeto*/
function convertPokeApi_model(pokeDetail) {
  let pokemon = new Pokemon();
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.image = pokeDetail.sprites.front_default;
  pokemon.stats = pokeDetail.stats.map((base_stats)=>base_stats.base_stat)

  return pokemon;
}

/*Requerindo dados detalhados de todos os pokemons*/
pokeApi.getDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApi_model);
};

/*Requerindo dados iniciais*/
pokeApi.getPokemons = (offset = 0, limit = 24) => {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .then((pokemons) => pokemons.map(pokeApi.getDetails))
    .then((detailsResquest) => Promise.all(detailsResquest))
    .then((pokeDetails) => pokeDetails)
    .catch((error) => console.log(error))
    .finally(() => console.log("Requisição concluída."));
};

