const pokemonDetail = document.getElementById("pokemonDetail");

function convertPokemonToPage(pokemon) {
  return `
    <section class="pokemon ${pokemon.type}">
      <div class="pageBack">
        <a href="./index.html">
          <button type="button">
            <box-icon name="arrow-back" color="white"></box-icon>
          </button>
        </a>
      </div>
      <h1 class="name">${pokemon.name}</h1>
      <span class="number"> #${pokemon.number}</span>
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>
      <img src="${pokemon.photo}" alt="${pokemon.name}" />
      <section class="details">
        <h3>About</h3>
        <ul class="datas">
          <li class="data">
            <span class="about">Height</span>
            <span>${pokemon.height}</span>
          </li>
          <li class="data">
            <span class="about">Weight</span>
            <span>${pokemon.weight}</span>
          </li>
          <li class="data">
            <span class="about">Abilities</span>
            <span>${pokemon.abilities}</span>
          </li>
        </ul>
      </section>
    </section>
  `;
}

function loadPokemonItens(name) {
  pokeApi.getPokemonByName(name).then((pokemon) => {
    const newHtml = convertPokemonToPage(pokemon);
    pokemonDetail.innerHTML += newHtml;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("name");
  console.log(pokemonName);
  loadPokemonItens(pokemonName);
});
