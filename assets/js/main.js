const pokemonList = document.querySelector('.pokemon-list');
const btnEl = document.querySelector('.btn');

const maxLimit = 151;
const limit = 10;
let offset = 0;

const formatOrder = (order) => {
  if (order < 10) return `#00${order}`;
  if (order < 100) return `#0${order}`;
  return `#${order}`;
}

const convertTypesToOl = (types = []) => {
  return types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
};

const createPokemon = ({ order, name, types, type, img }) => {
  return (`
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
        >
      </div>
    </li>
  `);
}

const loadPokemons = async (offset, limit) => {
  const pokemonDetails = await requestPokeApi(offset, limit);
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
