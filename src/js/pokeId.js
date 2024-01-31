const overlay = document.getElementById("overlay");
const pokemonDetail = document.getElementById("pokemonDetail");

function PokemonByID(pokemon) {
  return `
          <div class="modal ${pokemon.type}">
              <span class="close" onclick="closePokemonDetail()">&times;</span>
              <span class="name">${pokemon.name}</span>
              <span class="number">#${pokemon.number}</span>
              <div class="info">
                <div class="row">
                  <i class="fa fa-arrow-left" aria-hidden="true" onclick="previousPokemon()"></i>
                  <img src="${pokemon.photo}"
                  alt="${
                    pokemon.name
                  }"> <i class="fa fa-arrow-right" aria-hidden="true" onclick="nextPokemon()"></i>
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
