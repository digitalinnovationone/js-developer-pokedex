const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}" onClick="detailsPokemon('${pokemon.name}')">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItens(offset, limit)

async function detailsPokemon(pokeName) {
  const pokemon = await pokeApi.getDetails(pokeName).then(details => details);
  console.log("API details");
  let description = document.querySelector('#description');
  description.style.display = 'block';

  description.innerHTML = `
        <div class="pokemon-card">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h1 class="pokemon-name">${pokemon.name.toUpperCase()}</h1>
            <div class="pokemon-type"><strong>HP:</strong> ${pokemon.hp}</div>
            <div class="pokemon-type"><strong>ATTACK:</strong> ${pokemon.attack}</div>
            <div class="pokemon-type"><strong>DEFFENSE:</strong> ${pokemon.deffense}</div>
            <div class="pokemon-type"><strong>SPECIAL ATTACK::</strong> ${pokemon.specialAttack}</div>
            <div class="pokemon-type"><strong>SPECIAL DEFFENSE:</strong> ${pokemon.specialDefense}</div>
            <div class="pokemon-type"><strong>SPEED:</strong> ${pokemon.speed}</div>
        </div>
    `;

  let btn = document.createElement('button');
  btn.className = "btnclose";
  btn.innerHTML = 'Limpar';
  btn.addEventListener('click', () => {
    description.style.display = 'none';
  });
  description.appendChild(btn);
}

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})