const overlay = document.getElementById("overlay");
const pokemonDetail = document.getElementById("pokemonDetail");

function PokemonByID(pokemon) {
  return `
          <div class="modal ${pokemon.type}">
              <span class="close" onclick="closePokemonDetail()">&times;</span>
              <span class="name">${pokemon.name}</span>
              <span class="number">#${pokemon.number}</span>
              <div class="info">
                  <img src="${pokemon.photo}"
                  alt="${pokemon.name}">
  
                  <div class="detail">
                  <ol class="types row">
                      ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                  </ol>
                  </div>
                  
                  <div class="about">
                      <div class="title"> <hr> Sobre <hr> </div>
                      <p>Altura: ${pokemon.altura}</p>
                      <p>Peso: ${pokemon.peso}</p>
  
                      <ul class="stats-container">
                          <div class="title"> <hr> Status <hr> </div>
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
                              }%" 
                                  class='progress ${pokemon.type}'/></span>
                          </li>`
                            )
                            .join("")}
                    </ul>
                  </div>
              </div>
          </div>
      `;
}

function showPokemonDetail(pokemonId) {
  pokeApi.getPokemonByID(pokemonId).then((data) => {
    const singlePokemon = PokemonByID(data);
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

function closePokemonDetail() {
  overlay.style.display = "none";
  pokemonDetail.style.display = "none";
}
