const pokePage = document.querySelector(".content");
const backBtn = document.querySelector(".back-btn");
const pokePageTemplate = `
            
            `;

pokePage.innerHTML = pokePageTemplate;

// console.log(pokePage);

function pokeInfo() {
  pokeApi.getPokemonDetailPage().then((pokemon) => {
    console.log(pokemon);
    pokePage.innerHTML = `
    </div>
    <div class="box-main">
    <div>
    <div></div>
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
    <button class="about-button">About</button>
    <button class="base-stats-button">Base Stats</button>
    </div>

    <!-- <li>Evolution</li> -->
    <!-- <li>Moves</li> -->
    <div class="about">
    <ul>
        <li>Height: ${pokemon.height} m</li>
        <li>Weight: ${pokemon.weight} kg</li>
        <li>Abilities: ${pokemon.abilities}</li>
    </ul>
    </div>

    <div class="Base Stats">
    <li>HP: ${pokemon.hp}</li>
    <li>Attack: ${pokemon.attack}</li>
    <li>Defense: ${pokemon.deffense}</li>
    <li>Special Attack: ${pokemon.specialAttack}</li>
    <li>Special Defense: ${pokemon.specialDefense}</li>
    <li>Speed: ${pokemon.speed}</li>
    <li>Total: ${pokemon.total}</li>
    
    </div>
    </div>`;
  });
}

pokeInfo();

backBtn.addEventListener("click", () => (window.location.href = "index.html"));
