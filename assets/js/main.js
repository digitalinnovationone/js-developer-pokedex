let pokemonOl = document.getElementById("pokemonlist");
const loadMorebutton = document.getElementById("loadMorebutton");
const loadMoreDiv = document.getElementById("loadMoreDiv");
const detailsPokemon = document.getElementById("detailsPokemon");
const limit = 30;
let offset = 0;

const maxPokemons = 386;

/*Inserindos novos pokemons*/
function convertPokemon_li(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}" onclick="selectPokemon(${
    pokemon.number
  })">
          <span class="number">#${pokemon.number}</span>
          <h3>${pokemon.name}</h3>

          <div class="details">
          <ol class="type">
          ${pokemon.types
            .map((type) => `<li class="${type}">${type}</li>`)
            .join("")}
          </ol>

            <img
                src="${pokemon.image}"
              alt="${pokemon.name}"
            />
          </div>
        </li>
    `;
}

function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonOl.innerHTML += pokemons.map(convertPokemon_li).join("");
  });
}

loadPokemons(offset, limit);

/*Carregando mais pokemons caso o limit de 3 gen não foi atendido*/
loadMorebutton.addEventListener("click", () => {
  offset += limit;

  let numPokeNextPage = offset + limit;

  if (numPokeNextPage >= maxPokemons) {
    const newLimit = maxPokemons - offset;
    loadPokemons(offset, newLimit);
    loadMorebutton.parentElement.removeChild(loadMorebutton);
    loadMoreDiv.innerHTML = `<p id="endOfPokedex">Desculpe, não há mais pokemons disponíveis para visualização :(</p>`;
  } else {
    loadPokemons(offset, limit);
  }
});

const selectPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  displayPopup(pokemon);
};

const displayPopup = (pokemon) => {
  const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  const abilities = pokemon.abilities.map(
    (abilitySlot) => abilitySlot.ability.name);

  pokemon.types = types;
  pokemon.type = type;
  const photo = pokemon.sprites.other.dream_world.front_default;
  pokemon.abilities = abilities

  const htmlString = 
`<div class="${pokemon.type}" id="popup">
  <section class="detailPokemon ${pokemon.type}">
    <div class="pokeHeader">
      <button id="goBackButton" onClick="closePopup()">
        <img src="assets/imgs/go-back.png" alt="Voltar <-" />
      </button>
      <h1 id="pokeDetailName">${pokemon.name}</h1>
      <span id="pokeDetailNumber">#${pokemon.id}</span>
      <ul class="pokeDetailTypes">
        ${pokemon.types .map((type) => `
        <li class="pokeDetailType ${type}">${type}</li>
        `) .join("")}
      </ul>
    </div>

    <figure>
      <img src="${photo}" alt="${pokemon.name} image" class="pokeDetailImage" />
    </figure>

    <section class="pokeDetailContent">
      <h2 class="pokeDetailData">Sobre</h2>
      <ul class="pokeDetailAbout">
        <li><strong>Altura</strong></li>
        <li>${(pokemon.height / 10).toFixed(2)} m</li>
        <li><strong>Peso</strong></li>
        <li>${(pokemon.weight / 10).toFixed(2)} kg</li>
        <li><strong>Abilidades</strong></li>
        <li>${pokemon.abilities.slice().join(", ")}</li>
      </ul>
      <h2 class="pokeDetailData">Status base</h2>
      <div class="pokeDetailStatus">
        <div class="statusName">
          ${pokemon.stats .map((name_stats) => `
          <p class="${type}">${name_stats.stat.name}</p>
          `) .join("")}
        </div>
        <div class="statusNum">
          ${pokemon.stats .map((base_stats) => `
          <p>${base_stats.base_stat}</p>
          `) .join("")}
        </div>
      </div>
    </section>
  </section>
</div>`;
  pokemonOl.innerHTML += htmlString;
};

const closePopup = () => {
  const popup = document.getElementById("popup");
  popup.parentElement.removeChild(popup);
};
