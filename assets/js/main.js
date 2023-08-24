const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 1080;
const limit = 12;
let offset = 0;

function getFandomUrl(pokemon) {
  return `https://pokemon.fandom.com/pt-br/wiki/${pokemon.name}`;
}

function convertPokemonToLi(pokemon) {
  return `
          <li class="pokemon ${pokemon.type}">
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>
  
              <div class="detail">
                  <ol class="types">
                      ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join('')}
                  </ol>
  
                  <div class="tooltip">
                    <a class="clickable-link" href="${getFandomUrl(
                      pokemon,
                    )}" target="_blank">
                      <img class="clickable-image swing" src="${pokemon.photo}"
                           alt="${pokemon.name}" data-pokemon="${pokemon.name}">
                      <span class="tooltiptext">Descubra Mais</span>
                    </a>
                  </div>
              </div>
          </li>
      `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;

    const clickableImages = document.querySelectorAll('.clickable-image');
    clickableImages.forEach((image) => {
      image.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action
        const pokemonName = event.target.getAttribute('data-pokemon');
        if (pokemonName) {
          const fandomUrl = getFandomUrl({ name: pokemonName });
          if (fandomUrl) {
            window.open(fandomUrl, '_blank'); // Open in a new tab
          }
        }
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
