const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const overlay = document.getElementById("overlay");
const pokemonModal = document.getElementById("pokemonModal");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}"onClick="showPokemonModal(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function convertSinglePokemon(pokemon) {
  return `
        <div class="modal ${pokemon.type}">
            <span class="close" onclick="closePokemonModal()">&times;</span>
            <h2>${pokemon.name}</h2>
            <p>Number: #${pokemon.number}</p>
            <p>Types: ${pokemon.types.join(", ")}</p>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    `;
}

function showPokemonModal(pokemonId) {
  pokeApi.getSinglePokemon(pokemonId).then((data) => {
    const singlePokemon = convertSinglePokemon(data);
    Modal(singlePokemon);
  });
}

function Modal(singlePokemon) {
    overlay.style.display = 'block';
    pokemonModal.style.display = 'block';
    pokemonModal.innerHTML = singlePokemon;
}

function closePokemonModal() {
    overlay.style.display = 'none';
    pokemonModal.style.display = 'none';
}

