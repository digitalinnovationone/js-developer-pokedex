const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const content = document.getElementsByClassName('content')[0];

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
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function convertPokemonDetailToHtml(pokemon) {
  return `
    <div class="pokemonDatails ${pokemon.type}">
    <div class="info">
    <h2>${pokemon.name}</h2>
    <span class"number">#${pokemon.number}</span>
    <p>${pokemon.type}</p>
    </div>
      <img src="${pokemon.frontDetailPhoto}" alt="${pokemon.name}">
      <div class="stats">
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p>Abilities: ${pokemon.abilities.join(', ')}</p>
      </div>
    </div>
  `
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

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

async function getPokemonById(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const response = await fetch(url);
  const pokeDetail = await response.json();
  const pokemon =  convertPokeApiDetailToPokemon(pokeDetail);
  return convertPokemonDetailToHtml(pokemon);
}

pokemonList.addEventListener('click', (event) => {
  event.preventDefault();
  pokemonId = event.target
    .closest('.pokemon')
    .querySelector('.number')
    .textContent.split('#')[1];

    getPokemonById(pokemonId).then((html) => {
      content.innerHTML = html;
    });
    
});
