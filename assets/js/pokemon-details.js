const previousButton = document.getElementById("previous");
const nextButton = document.querySelector("#next");
const content = document.querySelector(".content-pokemon");
const navbar = document.querySelector(".navbar");
const maxRecords = 151;

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const pokemonIdString = new URLSearchParams(window.location.search).get("id");
  const pokemonId = pokemonIdString ? parseInt(pokemonIdString, 10) : null;
  const id = pokemonId;

  if (!id) return (window.location.pathname = "");
  if (id > maxRecords) return (window.location.pathname = "");

  pokemonCurrent = id;

  pokeApi.getPokemonById(id);
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  const pokemonIdString = new URLSearchParams(window.location.search).get("id");
  const pokemonId = pokemonIdString ? parseInt(pokemonIdString, 10) : null;

  if (pokemonId !== null) {
    const nextPokemon = pokemonId < maxRecords ? pokemonId + 1 : maxRecords;
    const basePath = window.location.pathname;
    const newPath = `?id=${nextPokemon}`;
    window.location.href = basePath + newPath;
  } else {
    console.error("ID do Pokémon não encontrado ou inválido na URL.");
  }
});

previousButton.addEventListener("click", (e) => {
  e.preventDefault();
  const pokemonIdString = new URLSearchParams(window.location.search).get("id");
  const pokemonId = pokemonIdString ? parseInt(pokemonIdString, 10) : null;

  if (pokemonId !== null) {
    const nextPokemon = pokemonId > 1 ? pokemonId - 1 : 1;
    const basePath = window.location.pathname;
    const newPath = `?id=${nextPokemon}`;
    window.location.href = basePath + newPath;
  } else {
    console.error("ID do Pokémon não encontrado ou inválido na URL.");
  }
});

function convertPokemonToLi(pokemon) {
  return `
         <img src="${pokemon.photo}" alt="${pokemon.name}">
         <h1 class="name">${pokemon.name}  <span class="number">#${
    pokemon.number
  }</span></h1>
            
                  <ol class="types">
                      ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                  </ol>

                 

                <div class="pokemon-detail-footer">
                <ul class="stats-container">
                  <h2>Stats</h2>
                  ${Object.entries(pokemon.stats)
                    .map(
                      ([statName]) =>
                        `<li class='stats'>
                      <p>${statName}</p>
                      <p>${pokemon.stats[statName].base_stat}</p>
                      <span class='progress-bar dark'>
                      <span style="width: ${
                        pokemon.stats[statName].base_stat > 100
                          ? 100
                          : pokemon.stats[statName].base_stat
                      }%" class='progress ${pokemon.type}' />
                      </span>
                    </li>`
                    )
                    .join("")}
                </ul>
              </div>
  
      `;
}

pokeApi.getPokemonById = async (pokeId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;

  try {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    const infoSpecies = await pokeApi.getInfoSpecies(pokeId);
    const pokemon = convertPokeApiDetailToPokemon(pokemonDetails, infoSpecies);
    const html = convertPokemonToLi(pokemon);

    content.innerHTML += html;
    content.classList.add(pokemon.type);
    navbar.classList.add(pokemon.type);
  } catch (error) {
    console.error("Erro ao obter detalhes do Pokémon:", error);
  }
};

pokeApi.getInfoSpecies = (pokeId) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => pokemon);
};

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    content.innerHTML += newHtml;
  });
}
