const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id = ${pokemon.name}>
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

    // Recupere os pokemons existentes no localStorage
    let existingPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

    // Adicione os novos pokemons à lista existente
    existingPokemons = existingPokemons.concat(pokemons);

    // Remova duplicatas
    existingPokemons = existingPokemons.filter(
      (pokemon, index, self) =>
        index === self.findIndex((t) => t.number === pokemon.number)
    );

    // Ordene os pokemons em ordem crescente pelo número
    existingPokemons.sort((a, b) => a.number - b.number);

    // Armazene os pokemons atualizados no localStorage
    localStorage.setItem("pokemons", JSON.stringify(existingPokemons));
  });
}

loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
  const element = event.target.closest("#loadMoreButton");
  if (element) {
    event.preventDefault();
    element.remove();
  }
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset
      loadPokemonItens(offset, newLimit)

      loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
      loadPokemonItens(offset, limit)
  }
})

pokemonList.addEventListener("click", () => {
  const element = event.target.closest(".pokemon");
  if (element) {
    event.preventDefault();
    const selectedPokemon = Pokemons[element.id];
    localStorage.setItem("selectedPokemon", JSON.stringify(selectedPokemon));
    window.location.href = "/pokemon-details.html";
  }
});

// observer
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);
    } else {
      loadPokemonItens(offset, limit);
    }
  }
}, options);

observer.observe(document.querySelector("#trigger"));