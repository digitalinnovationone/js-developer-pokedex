const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokeModal = document.getElementById("pokeModal");


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons
        .map(
          (pokemon) =>
            `<li class="pokemon ${pokemon.type}" onclick ='testModal(${
              pokemon.number
            })' ontouch='testModal(${pokemon.number})'>
            <span class="number">#${pokemon.number
              .toString()
              .padStart(3, "0")}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                    
            
              </ol>
              <img
              
                src="${pokemon.photo}"
                alt="${pokemon.name}"
              />
            </div>
            </li>
    
    `
        )
        .join("");
      pokemonList.innerHTML += newHtml;
    });
  }

function testModal(number) {
    pokeApi.getPokemonMoreDetails(number).then((pokemonDetail = []) => {
      pokeModal.innerHTML = `
          <li class="pokemonOpenModal ${pokemonDetail.type}">
              
              <div id="fecharBotão">
                  <span>#${pokemonDetail.number
                    .toString()
                    .padStart(3, "0")}</span>
                  <span class="nameModal">${pokemonDetail.name}</span>
                  <button class="fechar" onclick="fecharJanela()" ontouch="fecharJanela()">X</button>
              </div>
  
             
                  <div class="type">
                  <span>Types:  </span>
                  ${pokemonDetail.types
                    .map((type) => `<span class="type ${type}">${type}</span>`)
                    .join("")}
                  </span>
                  </div>
              
          
              
                
  
              <div class="pokemonImageModal">
                  <img class="pokemonImagem" src="${pokemonDetail.photo}" 
                  alt="${pokemonDetail.name}" />
              </div>  
              
              <div class="skills"> 
                      <span>Skills:</span>                
                      <span class="skillModal ${pokemonDetail.type}">${
        pokemonDetail.skill1
      }</span>
                      <span class="skillModal ${pokemonDetail.type}">${
        pokemonDetail.skill2
      }</span>
                  </div>
              </div>
  
              <div >
                  <h3 >Attributes:</h3>
                  <div>
                  <div >
                      <span>Hp:</span>
                      <span>${pokemonDetail.statValueHp}</span>
                  </div>
  
                  <div >
                      <span>ATK:</span>
                      <span>${pokemonDetail.statValueAtk}</span>
                  </div>
  
                  <div >
                      <span>DEF:</span>
                      <span>${pokemonDetail.statValueDef}</span>
                  </div>
  
                  <div >
                      <span>Special-ATK:</span>
                      <span>${pokemonDetail.statValueSatk}</span>
                  </div>
  
                  <div >
                      <span>Special-DEF:</span>
                      <span>${pokemonDetail.statValueSdef}</span>
                  </div>
  
                  <div >
                      <span>Speed:</span>
                      <span>${pokemonDetail.statValueSpd}</span>
                  </div>
                  </div>
              </div>
              
          </li>
          `;
    });
  }

  convertPokemonToLi(offset, limit);

  loadMoreButton.addEventListener("click", () => {
    offset += limit;
  
    const qtdRecordNextPage = offset + limit;
  
    if (qtdRecordNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      convertPokemonToLi(offset, newLimit);
      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      convertPokemonToLi(offset, limit);
    }
  });