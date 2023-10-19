const pokeContainer = document.querySelector('.pokemon-container');
const pokemonList = document.querySelector('.pokemon-list');
const btnEl = document.querySelector('.btn');
const loadingElement = document.querySelector('.loading');

const maxLimit = 151;
const limit = 10;
let offset = 0;

const createPokemon = ({ order, name, types, type, img }) => {
  return (`
    <a href="details.html?id=${order}">
      <li class="pokemon ${type}" >
        <span class="number">${formatOrder(order)}</span>
        <span class="name">${name}</span>
        <div class="details">
          <ol class="types">
            ${convertTypesToOl(types)}
          </ol>
          <img
            src=${img}
            alt=${name}
          />
        </div>
      </li>
    </a>
  `);
}

const loadPokemons = async (offset, limit) => {
  loadingElement.style.display = 'block';
  pokeContainer.style.display = 'none';
  const pokemonDetails = await requestPokeApi(offset, limit);
  loadingElement.style.display = 'none';
  pokeContainer.style.display = 'block';
  const pokemonElements = pokemonDetails.map(pokemon => createPokemon(pokemon));
  pokemonList.innerHTML += pokemonElements.join('');
}

const handleBtn = () => {
  btnEl.addEventListener('click', () => {
    // debugger;
    offset += limit;
    const elementsQtd = offset + limit;

    if (elementsQtd >= maxLimit) {
      const restLimit = maxLimit - offset;
      loadPokemons(offset, restLimit);
      btnEl.parentElement.removeChild(btnEl);
    } else {
      loadPokemons(offset, limit);
    }

  })
}

window.onload = () => {
  loadPokemons(offset, limit);
  handleBtn();
}
