
const pokeApi = {};

// inserts the information into a interface called pokemon
function convertDetailsInPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  //sets the type of the pokemons
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  
  return pokemon;
}

//gets the url for the pokemon info and turns it into json
pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertDetailsInPokemon);
};

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  //when a arrow func is used and it has only one line the return statment is not needed

  return (
    fetch(url)
      .then((response) => response.json())
      .then((reponseJson) => reponseJson.results)
      //gets the list of pokemon than maps it throwing in the function "getPokemonDetail"
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
      .then((detailsRequests) => Promise.all(detailsRequests))
      .then((pokemonDetails) => pokemonDetails)
  );
};
//searches for one pokemon using its name, if the pokemon its not found shows a notfound

pokeApi.getPokemon = (pokemonname) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonname}/`;
  
  return(
    fetch(url)
      .then((response) => response.json())
      .then(convertDetailsInPokemon)
      .then((pokemon) => pokemon)
      .catch(() => {
        window.location.href = 'notFound.html';
    })
  )
};

