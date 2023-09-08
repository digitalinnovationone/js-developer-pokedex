const loadMoreButton = document.getElementById("loadMore");
const pokemonInput = document.getElementById("pokemonInput");
//references the pokemonm list in the HTML
const pokemonList = document.getElementById("pokemonList");
const PaginationButtonDiv = document.getElementById("paginationButton");

const limit = 10;
let offset = 0;
const max = 151;

//inserts the pokemon info into the HTML
function insertPokemon(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}" >${type}</li>`
                              )
                              .join(" ")}
                        </ol>
    
                        <img src=${pokemon.photo}
                            alt="${pokemon.name}">
                    </div>
        </li>
        `;
}

//maps the pokemon array returned from the api, uses the function to insert into a HTML format using the function "insertPokemon" and then injects into the HTML of the page
function loadPokemon(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(insertPokemon).join("");
  });
}

loadPokemon(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const totalPokemon = offset + limit;
  if (totalPokemon >= max) {
    const newLimit = max - offset;
    loadPokemon(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemon(offset, limit);
  }
});

// gets the information in the input and searchs for a specific pokemon using its name
pokemonInput.addEventListener("keydown", () => {
  const pokemonname = pokemonInput.value;
  if (event.key === "Enter") {
    pokeApi.getPokemon(pokemonname).then((pokemon) => {
      pokemonList.innerHTML = insertPokemon(pokemon);
      loadMoreButton.parentElement.removeChild(loadMoreButton);
      PaginationButtonDiv.innerHTML = `<div class="goBackButton">
      <button id="goBackBtn"> Go back</button>
      </div>`;
      const goBackBtn = document.getElementById("goBackBtn");
      goBackBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    });
  }
});
