const overlay = document.getElementById("overlay");
const pokemonDetail = document.getElementById("pokemonDetail");
let currentPokemonId = 1;

function PokemonByID(pokemon) {
  return `
          <div class="modal ${pokemon.type}">
              <span class="close" onclick="closePokemonDetail()">&times;</span>
              <span class="name">${pokemon.name}</span>
              <span class="number">#${pokemon.number}</span>
              <div class="info">
                <div class="row">
                  <i class="fa fa-arrow-left" aria-hidden="true" onclick="previousPokemon()" id="previous"></i>
                  <img src="${pokemon.photo}"
                  alt="${
                    pokemon.name
                  }"> <i class="fa fa-arrow-right" aria-hidden="true" onclick="nextPokemon()" id="next"></i>
                </div>

  
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

const fade = [{ opacity: 0 }, { opacity: 1 }];

const fadeTiming = {
  duration: 350,
  iterations: 1,
};
let animation;
let visible = false;

function fadeActivate() {
  animation = pokemonDetail.animate(fade, fadeTiming);
}

function showPokemonDetail(pokemonId) {
  if (!visible) {
    fadeActivate();
    visible = true;
    pokeApi.getPokemonByID(pokemonId).then((data) => {
      currentPokemonId = pokemonId;
      const singlePokemon = PokemonByID(data);
      Modal(singlePokemon);
    });
    if (visible) {
      overlay.addEventListener("click", () => {
        closePokemonDetail();
      });
    }
  }
}

function Modal(singlePokemon) {
  overlay.style.display = "block";
  pokemonDetail.style.display = "block";
  pokemonDetail.innerHTML = singlePokemon;
}

function closePokemonDetail() {
  if (visible) {
    animation.reverse();
    animation.addEventListener("finish", function () {
      overlay.style.display = "none";
      pokemonDetail.style.display = "none";
    });
    visible = false;
  }
}

function fetchPokemonById(pokemonId) {
  return pokeApi.getPokemonByID(pokemonId);
}

function showPokemonDetailById(pokemonId) {
  fetchPokemonById(pokemonId).then((data) => {
    const singlePokemon = PokemonByID(data);
    Modal(singlePokemon);
  });
}

function nextPokemon() {
  const nextPokemonId = currentPokemonId + 1;
  if (nextPokemonId == 152) {
    currentPokemonId = 1;
    showPokemonDetailById(currentPokemonId);
  } else {
    currentPokemonId++;
    showPokemonDetailById(currentPokemonId);
  }
}

function previousPokemon() {
  const previousPokemonId = currentPokemonId - 1;
  if (previousPokemonId < 1) {
    currentPokemonId = 151;
    showPokemonDetailById(currentPokemonId);
  } else {
    currentPokemonId--;
    showPokemonDetailById(currentPokemonId);
  }
}
