const elementList = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMore");

function convertPokemonToList(pokemon) {
  return `
  <li class="pokemon ${
    pokemon.type
  }" id="pokemon" onClick=redirectToPokemonDetails(${pokemon.number})>
  <span class="number">#${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>

  <div class="detail">
    <ol class="types">
      ${pokemon.types
        .map((type) => `<li class="type ${type}">${type}</li>`)
        .join("")}
    </ol>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
  </div>
</li>`;
}

pokeApi.getPokemons().then((pokemonsList = []) => {
  elementList.innerHTML += pokemonsList.map(convertPokemonToList).join("");
});

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {
    elementList.innerHTML += pokemonsList.map(convertPokemonToList).join("");
  });
}

const MAX_ITEMS = 151;
const LIMIT = 10;
let OFFSET = 0;

loadMoreButton.addEventListener("click", () => {
  OFFSET += LIMIT;
  const QTD_ITEMS_VISIBLE = OFFSET + LIMIT;

  if (QTD_ITEMS_VISIBLE >= MAX_ITEMS) {
    const NEW_LIMIT = MAX_ITEMS - OFFSET;
    loadPokemonItems(OFFSET, NEW_LIMIT);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(OFFSET, LIMIT);
  }
});

function redirectToPokemonDetails(pokemon) {
  window.location.href = `./pokemon.html?pokemon=${pokemon}`;
}
