const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const modalContainer = document.getElementById('modal-container');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
                </div>
                </li>
                `;
}

const detailsFunction = (pokemonList) => {
  const list = pokemonList.children;

  for (let i = 0; i < list.length; i += 1) {
    list[i].addEventListener('click', async () => {
      pokemonName = list[i].children[1].innerHTML;
      pokemonDetails = await getPokemonsDetailed(pokemonName);
      modalContainer.innerHTML = `
        <div class="modal">
            <div class="modal-inner-container">
                <div class="title-container">
                    <h2>${pokemonDetails.species.name}</h2>
                    <button onclick="modalClose()" class="close-btn">X</button>
                </div>
                <div class="superior ${pokemonDetails.types[0].type.name}">
                    <img src=${
                      pokemonDetails.sprites.other.dream_world.front_default
                    } alt="pokemon-img"/>
                    </div>
                    <div class="floor">
                    </div>
                    <div class="inferior">
                    <p>Details</p>
                    ${pokemonDetails.stats.map(
                      (stat, index) => `
                        <div class="stats-container">
                            <p key=${index} class="stats">${stat.stat.name}</p>
                            <p>${stat.base_stat}</p>
                        </div>
                        <div class="stats-inner-container ${pokemonDetails.types[0].type.name}"></div>
                    `
                    ).join('')}
                </div>
            </div>
        <div/>
        `;
    });
  }
};

async function loadPokemonItens(offset, limit) {
  const pokemons = await pokeApi.getPokemons(offset, limit);
  const newHtml = pokemons.map(convertPokemonToLi).join('');
  pokemonList.innerHTML += newHtml;

  const modal = await detailsFunction(pokemonList);
  // modalContainer.appendChild(modal)
}

const pokemons = loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

const modalClose = async () => {
  modalContainer.lastElementChild.remove();
};