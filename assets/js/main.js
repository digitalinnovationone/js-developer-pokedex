const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const closeModal = modal.querySelector(".close");

const maxRecords = 151;
const limit = 10;
let offset = 0;
var allPokemons = [];

async function loadPokemonItens(offset, limit) {
  const pokemons = await pokeApi.getPokemons(offset, limit);
  allPokemons.push(...pokemons);
  for (const pokemon of pokemons) {
    const liHtml = `
        <li id="${pokemon.number}"class="pokemon item-button ${
      pokemon.type
    } hover">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
  `;

    const ol = document.getElementById("pokemonList");
    ol.innerHTML += liHtml;
  }

  const buttons = document.querySelectorAll(".item-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectPokemon = allPokemons.find(
        (pokemon) => pokemon.number == this.id
      );
      const modalHtml = `<li id="${
        selectPokemon.number
      }"class="pokemon item-button ${selectPokemon.type}">
        <span class="number">#${selectPokemon.number}</span>
        <span class="name">${selectPokemon.name}</span>
        <img src="${selectPokemon.photo}"
            alt="${selectPokemon.name}">

        <div class="detail">
            <ol class="types">
                ${selectPokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
            </ol>
            <ol class="abilities">
                <span class="titleAbilities">Habilidades:</span>
                ${selectPokemon.abilities
                  .map(
                    (ability) =>
                      `<li class="abilities${ability}">${ability}</li>`
                  )
                  .join("")}
            </ol>
            <ol class="statsName">
            <span class ="titleStats">Status:</span>
            ${selectPokemon.stat
              .map(
                (nameStats) =>
                  `<li class="statsName${nameStats}">${nameStats}</li>`
              )
              .join("")}
            </ol>
            <ol class="stats">
            <div style="width: 10px; height: 10px;"></div>
            ${selectPokemon.stats
              .map((baseStat) => `<li class="numberBar">${baseStat}</li>`)
              .join("")}
            </ol>
        </div>
    </li>
        `;
      modalContent.innerHTML = modalHtml;
      modal.style.display = "block";
    });
  });
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", async () => {
  offset += limit;
  const qtRecordNextPage = offset + limit;

  if (qtRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    await loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    await loadPokemonItens(offset, limit);
  }
});