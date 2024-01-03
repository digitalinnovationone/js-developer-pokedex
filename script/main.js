const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

async function main() {
  const pokedex = new Pokedex(151, 10, pokemonList);
  await pokedex.loadMorePokemon();
  loadMoreButton.addEventListener("click", () => pokedex.loadMorePokemon());
}
main();
