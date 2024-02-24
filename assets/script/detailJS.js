const pokemonDetail = document.getElementById("pokemonDetail");
const abaAbaut = document.getElementById("about")
const abaBase = document.getElementById("base")
const abaEvolution = document.getElementById("evolution")
const abaMoves = document.getElementById("moves")

function convertPokemonToPage(pokemon) { // manimula a dom e ecrementa informações da api
  return `
  <div class="detailCont ${pokemon.type}">
  <div class="paginacao2">
      <button id="BackButton" type="button">
          <a href="/index.html">Back</a>
      </button>
  </div>
      <!-- CABECALHO -->
  <div class="header">
      <div>
          <span class="name"><h1>${pokemon.name}</h1></span>
          <span class="nunber">${pokemon.number}</span>
      </div>

      <div class="detail">
          <ul class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ul>
      </div>
      


      <div class="imageDeteil">
          <img src="${pokemon.photo}">
      </div>
  </div>
  <!-- FIM CABECALHO -->

  
  `;
}

function loadAbout(pokemon){  
  return `
  <div class="contentDetail">
                    <ol class="contentlist">
                        <li>Species <span>1</span> </li>
                        <li>Height <span>${pokemon.height}</span> </li>
                        <li>Weight <span>${pokemon.weight}</span> </li>
                        <li>Abilities <span>${pokemon.abilities}</span> </li>
                    </ol>
                </div>
  `
}

function loadbase(pokemon){
  return `
  <div class="contentDetail">
                <ol class="contentlist">
                    <li> ${pokemon.stats[0]} <span>${pokemon.indiceStat[0]}</span> </li>
                    <li> ${pokemon.stats[1]} <span>${pokemon.indiceStat[1]}</span> </li>
                    <li> ${pokemon.stats[2]} <span>${pokemon.indiceStat[2]}</span> </li>
                    <li> ${pokemon.stats[3]} <span>${pokemon.indiceStat[3]}</span> </li>
                    <li> ${pokemon.stats[4]} <span>${pokemon.indiceStat[4]}</span> </li>
                    <li> ${pokemon.stats[5]} <span>${pokemon.indiceStat[5]}</span> </li>
                </ol>
            </div>
  `
}

function loadEvolution(){
  return `
  <div class="contentDetail">
                <ol class="contentlist">
                    <li>Nivel Max <span>52</span></li>
                    <li>Nivel Max <span>78</span></li>
                    <li>Nivel Max <span>120</span></li>
                </ol>
            </div>
  `
}

function loadMoves(pokemon){
  return `
  <div class="contentDetail">
    <ol class="contentlist">
        <li> <span>${pokemon.moves}</span> </li>
    </ol>
  </div>
  `
}

function loadPokemonItens(name) {
  pokeApi.getPokemonByName(name).then((pokemon) => {
        //carrega html na pagina
    const newHtml = convertPokemonToPage(pokemon);
    const newAbout = loadAbout(pokemon);
    const newBase = loadbase(pokemon);
    const newEvolution = loadEvolution(pokemon);
    const newMoves = loadMoves(pokemon);
    pokemonDetail.innerHTML += newHtml;
    abaAbaut.innerHTML += newAbout;
    abaBase.innerHTML += newBase;
    abaEvolution.innerHTML += newEvolution;
    abaMoves.innerHTML += newMoves;
  });
}

document.addEventListener("DOMContentLoaded", function () { //essa função é responsável por carregar os detalhes do Pokémon com base no nome fornecido.
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("name");
  console.log(pokemonName);
  loadPokemonItens(pokemonName);
});