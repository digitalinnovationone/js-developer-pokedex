let pokemonOl = document.getElementById("pokemonlist");
const loadMorebutton = document.getElementById("loadMorebutton");
const loadMoreDiv = document.getElementById("loadMoreDiv");
const limit = 30;
let offset = 0;

const maxPokemons = 386;

/*Inserindos novos pokemons*/
function convertPokemon_li(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
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
