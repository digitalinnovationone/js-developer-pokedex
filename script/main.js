const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const MAX_RECORDS = 151;
const LIMIT = 10;
let offset = 0;

async function loadPokemonCards(offset, limit) {
  const pokemons = await PokeAPI.getPokemons(offset, limit);
  renderPokemonList(pokemons, pokemonList);
}
function loadMorePokemon() {
  offset += LIMIT;
  const qtdRecordsWithNexPage = offset + LIMIT;

  if (qtdRecordsWithNexPage >= MAX_RECORDS) {
    const newLimit = MAX_RECORDS - offset;
    loadPokemonCards(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonCards(offset, LIMIT);
  }
}

async function main() {
  await loadPokemonCards(offset, LIMIT);
  loadMoreButton.addEventListener("click", loadMorePokemon);
}
main();
