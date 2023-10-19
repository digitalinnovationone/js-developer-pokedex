const bodyEl = document.querySelector('body');
const mainEl = document.querySelector('#main-content');
const headerEl = document.querySelector('.header');
const infosEl = document.querySelector('.infos-container');
const loadingElement = document.querySelector('.loading');
const btnHomeEl = document.querySelector('.btn-home');

const createTitleEl = ({ order, name, types }) => {
  const header = `
    <div class="title">
      <h1 class="title">${name}</h1>
      <span class="order">${formatOrder(order)}</span>
    </div>
    <ol class="types">
      ${convertTypesToOl(types)}
    </ol>
  `;
  headerEl.innerHTML = header;
}

const createImgEl = ({ img }) => {
  const imgEl = `
    <div class="img-container">
      <img src="${img}" alt="Imagem do pokemon">
    </div>
  `;
  infosEl.innerHTML += imgEl;
}

const createAboutPokemonEl = ({ name, height, weight, abilities, status }) => {
  const formatAbilities = abilities.join(', ');

  const aboutPokemonEl = `
    <div class="about-container">
      <h3>Estatísticas do ${name}</h3>
      <p><strong>Altura:</strong> ${height/10} metros</p>
      <p><strong>Peso:</strong> ${weight/10} kg</p>
      <p><strong>HP:</strong> ${status.hp}</p>
      <p><strong>Ataque:</strong> ${status.attack}</p>
      <p><strong>Defesa:</strong> ${status.defense}</p>
      <p><strong>Velocidade:</strong> ${status.speed}</p>
      <p><strong>Habilidades:</strong> ${formatAbilities}</p>
    </div>
  `;
  infosEl.innerHTML += aboutPokemonEl;
}

const getPokemonDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await requestPokeDetails(endpoint);
  loadingElement.style.display = 'none';
  
  bodyEl.classList.add(pokemon.type);
  createTitleEl(pokemon);
  createImgEl(pokemon);
  createAboutPokemonEl(pokemon);
}

const handleBtnHome = () => {
  btnHomeEl.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
}

window.onload = () => {
  handleBtnHome();
  getPokemonDetails();
}
