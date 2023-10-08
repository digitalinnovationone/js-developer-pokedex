function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const pokemonId = getQueryParam("pokemon");

if (pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .then((pokemonData) => {
            const pokemonDetails = document.getElementById("pokemon-details");
            pokemonDetails.innerHTML = `
      <div class="card ${pokemonData.type}">
            <div class="top ${pokemonData.type}">
              <div class="top-number"><span class="number">#${pokemonData.number
                }</span></div>
              <img src="${pokemonData.photo}" alt="${pokemonData.name}">
            </div>
            <div class="bottom">
              <h3 class="name">${pokemonData.name}</h3>
              <div class="skills">
                <ol>
                ${pokemonData.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
                </ol>
              </div>
              <div class="details">
                <div class="about">
                  <p>Height: ${pokemonData.height} m</p>
                  <p>Weight: ${pokemonData.weight} kg</p>
                </div>
                <span class="ability"><p class="abilities">Abilities:</p>${pokemonData.abilities
                    .map((ability) => `<p>${ability}</p>`)
                    .join("")}</span>
              </div>
              <button id="back-home" onClick=goHome()>Back</button>
            </div>
        </div>
        
      `;
        });
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.abilities = pokeDetail.abilities.map(
        (ability) => ability.ability.name
    );
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    console.log(pokemon);
    return pokemon;
}

function goHome() {
    window.location.href = "index.html";
}

document.getElementById("back-home").addEventListener("click", function () {
    window.location.href = "index.html";
});