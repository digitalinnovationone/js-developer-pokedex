const pokemonList = document.getElementById('pokemonList');
const loader = document.getElementById('loader');
const modal = document.getElementById('p-modal');

const maxRecords = 151;
const limit = 24;
let offset = 0;

let loading = false;

const hideLoader = () => {
  loader.classList.remove('loader--show');
};

const showLoader = () => {
  loader.classList.add('loader--show');
};

const closeModal = () => {
  modal.setAttribute('show', false);
};

const isLoading = () => {
  return loader.classList.contains('loader--show');
};

const loadPokemonItens = async (offset, limit) => {
  showLoader();

  let pokemons = await pokeApi.getPokemons(offset, limit);

  pokemons.forEach((pokemon) => {
    const card = document.createElement('pokemon-card');
    card.setAttribute('name', pokemon.name);
    pokemonList.append(card);
  });

  hideLoader();
};

loadPokemonItens(offset, limit);

const scroll = () => {
  if (
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 5 &&
    offset + limit < maxRecords &&
    !isLoading()
  ) {
    offset += limit;
    let newLimit = limit;

    if (offset + limit > maxRecords) newLimit = maxRecords - offset;

    loadPokemonItens(offset, newLimit);
  }
};

window.addEventListener('scroll', scroll, {
  passive: true,
});

window.addEventListener('touchmove', scroll);
