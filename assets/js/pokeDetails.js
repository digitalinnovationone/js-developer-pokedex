const idPokemon = localStorage.getItem('idPokemon');
const backButton = document.getElementById('backButton')
const card = document.getElementById('card-pokemon');
let pokemon;

const getPokemon = async () => {
  const pokemon = await pokeApi.getPokemon(idPokemon);
  console.log(pokemon);
  return {
    name: pokemon.name,
    number: pokemon.id,
    abilities: pokemon.abilities,
    stats: pokemon.stats,
    types: pokemon.types,
    img: pokemon.sprites.other.dream_world.front_default
  }
}

//botão de voltar para a pokedex
backButton.addEventListener('click', () => {
  window.location.href = `/`;
})

const createCardPokemon = async (pokemon) => {
  card.innerHTML = `
  <div class="pokemon-card">
    <span class="name">${pokemon.name}</span>
    <span class="number">#${pokemon.number}</span>
    <div class="img">
      <img src="${pokemon.img}" alt="${pokemon.name}">
    </div>
    <div class="content-details">
      <nav class="nav-bar">
        <ul>
          <li><a href="#/abilities">Habilidades</a></li>
          <li><a href="#/">Estatisticas</a></li>
          <li><a href="#/types">Tipo</a></li>
        </ul>
      </nav>
      <div id="conteudo"> 
        <ul class="stats">${pokemon.stats.map((data) => `
          <li class="stats">
            ${data.stat.name} = ${data.base_stat}
          </li>`).join('')}
          <br/>
          <li class="stats">total = ${pokemon.stats.reduce(( acc, point) => {
              return acc + point.base_stat; 
            },0)}
          </li>
        </ul>
      </div>
    </div>
  </div>`
}

// Função para manipular as rotas
function roteador() {
  const conteudo = document.getElementById("conteudo");

  const hash = window.location.hash.slice(2) || "/";
  if (hash === "abilities") {
      conteudo.innerHTML = `<ul class="abilities">
      ${pokemon.abilities.map((habilidade) => `
      <li class="stats ${habilidade.ability.name}">${habilidade.ability.name}</li>
    `).join('')}
    </ul>`;
  } else if (hash === "/") {
      conteudo.innerHTML = `<ul class="stats">
      ${pokemon.stats.map((data) => `
        <li class="stats">${data.stat.name} = ${data.base_stat}</li>
      `).join('')}
      <br/>
      <li class="stats total}">total = ${pokemon.stats.reduce(( acc, point) => {
        return acc + point.base_stat; 
      },0)}</li>
    </ul>`;
  } else if (hash === "types") {
      conteudo.innerHTML = `
      <ul class="types">
      ${pokemon.types.map((tipo) => `<li class="types">${tipo.type.name}</li>`).join('')}
    </ul>`;
  } else {
    console.log(hash);
      conteudo.innerHTML = "<h1>Opção não encontrada</h1>";
  }
}

// Chamar a função de roteamento sempre que a hash da URL mudar
window.addEventListener("hashchange", roteador);

window.onload = async () => {
  pokemon = await getPokemon();
  card.classList.add(`${pokemon.types[0].type.name}`)
  createCardPokemon(pokemon);
}