
const pokePage = document.querySelector(".content");

function pokeInfo() {
  pokeApi.getPokemonDetailPage().then((pokemon) => {
    pokePage.innerHTML = `
    <div class="${pokemon.type} content">
      <button class="back-btn ph-thin ph-arrow-left"></button>
      <div class="box-main">
        <div>
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <ul class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${pokemon.type}" >${type}</li>`)
          .join("")}
        </ul>
        </div>
        <h5 class="pokemon-number">${pokemon.number}</h5>
      </div>

      <div class="image-container">  
        <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          pokemon.number
        }.svg"
        alt=""
        />
      </div>

      <div class="info-box">
        <div class="buttons-container">
          <button id="about-button">About</button>
          <button id="base-stats-button">Base Stats</button>
        </div>
        
        
        <ul class="about">
            <li>Height: ${pokemon.height} m</li>
            <li>Weight: ${pokemon.weight} kg</li>
            <li>Abilities: ${pokemon.abilities}</li>
        </ul>
      

        <ul class="base-stats">
          <li>HP: ${pokemon.hp}</li>
          <li>Attack: ${pokemon.attack}</li>
          <li>Defense: ${pokemon.deffense}</li>
          <li>Special Attack: ${pokemon.specialAttack}</li>
          <li>Special Defense: ${pokemon.specialDefense}</li>
          <li>Speed: ${pokemon.speed}</li>
          <li>Total: ${pokemon.total}</li>
        </ul>
      </div>
    </div>`;

    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
    const aboutButton = document.getElementById("about-button");
    const baseStatsButton = document.getElementById("base-stats-button");
    const about = document.querySelector(".about");
    const baseStats = document.querySelector(".base-stats");

    aboutButton.addEventListener("click", () => {
      if (about.style.display = "none") {
        about.style.display = "block";
        baseStats.style.display = "none"
        aboutButton.style.borderBottom = "2px solid blue"
        baseStatsButton.style.borderBottom = "none"
      }
    });

    baseStatsButton.addEventListener("click", () => {
      if (baseStats.style.display = "none") {
        about.style.display = "none";
        baseStats.style.display = "block"
        aboutButton.style.borderBottom = "none"
        baseStatsButton.style.borderBottom = "2px solid blue"
      }
    })

  });
}

pokeInfo();
