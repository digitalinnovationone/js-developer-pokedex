const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const overlay = document.getElementById("overlay");
const pokemonDetail = document.getElementById("pokemonDetail");

const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}"onClick="showpokemonDetail(${
    pokemon.number
  })">
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
            <span class="close" onclick="closepokemonDetail()">&times;</span>
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
            <div class="detail">
                <ol class="types row">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </div>
    `;
}

function showpokemonDetail(pokemonId) {
  pokeApi.getSinglePokemon(pokemonId).then((data) => {
    const singlePokemon = convertSinglePokemon(data);
    Modal(singlePokemon);
  });
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    pokemonDetail.style.display = "none";
  });
}

function Modal(singlePokemon) {
  overlay.style.display = "block";
  pokemonDetail.style.display = "block";
  pokemonDetail.innerHTML = singlePokemon;
}

function closepokemonDetail() {
  overlay.style.display = "none";
  pokemonDetail.style.display = "none";
}
