const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <div class="info">
                <span class="name">${pokemon.name}</span>
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
            </div>
            <div class="details">
                <div class="image">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="card">
                    <h3>Stats:</h3>
                    <div class="stats">
                        <p>hp: ${
                          pokemon.stats.find((stat) => stat.name === "hp").value
                        }</p>
                        <p>attack: ${
                          pokemon.stats.find((stat) => stat.name === "attack")
                            .value
                        }</p>
                        <p>defense: ${
                          pokemon.stats.find((stat) => stat.name === "defense")
                            .value
                        }</p>
                        <p>special-attack: ${
                          pokemon.stats.find(
                            (stat) => stat.name === "special-attack"
                          ).value
                        }</p>
                        <p>special-defense: ${
                          pokemon.stats.find(
                            (stat) => stat.name === "special-defense"
                          ).value
                        }</p>
                        <p>speed: ${
                          pokemon.stats.find((stat) => stat.name === "speed")
                            .value
                        }</p>
                    </div>
                </div>
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
