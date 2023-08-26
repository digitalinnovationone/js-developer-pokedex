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
      .map((type) => `<span class="type ${pokemon.type}" >${type}</span>`)
      .join("")}
    </ul>
    </div>
    <h5 class="pokemon-number">#001</h5>
    </div>

    <div class="image-container">
    <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
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
        <li>Sepecies: Seed</li>
        <li>Height: 0.7cm</li>
        <li>Weigt 6.9kg</li>
        <li>Abilities: Overgrow</li>
    </ul>
    </div>

    <!-- <div class="Base Stats">
    <li>HP: 45</li>
    <li>Attack: 52</li>
    <li>Defense: 66</li>
    <li>Sp. Attack: 77</li>
    <li>Sp. Defense: 22</li>
    <li>Total: 452</li>
    </div> -->
    </div>`;
  });
}

pokeInfo();

backBtn.addEventListener("click", () => (window.location.href = "index.html"));
