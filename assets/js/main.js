const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 6;
let offset = 0;

function convertPokemonToLi(pokemon) {
    const li = document.createElement('li');
    li.className = `pokemon ${pokemon.type}`;
    li.innerHTML = `
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    `;
  
    li.addEventListener('click', () => showPokemonDetails(pokemon));
    return li;
  }

  function showPokemonDetails(pokemon) {
    const popup = document.querySelector('.popup');
    popup.innerHTML = `
      <div class="popup-content ${pokemon.type}">
        <h2 =cardName>${pokemon.name} #${pokemon.number}</h2>
        <div class="pokemon-card">
          <img src="${pokemon.photo}" alt="${pokemon.name}">
          <p class=tipo>Tipo(s): ${pokemon.types.join(', ')}</p>
          <p class=habilidade>Habilidades: ${pokemon.abilities.join(', ')}</p>
          <button id="closePopup">Fechar</button>
        </div>
      </div>
    `;
  
    popup.style.display = 'block';
  
    document.getElementById('closePopup').addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.forEach((pokemon) => {
      const pokemonElement = convertPokemonToLi(pokemon);
      pokemonList.appendChild(pokemonElement);
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  loadPokemonItens(offset, limit);
});