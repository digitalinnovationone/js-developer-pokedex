const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return ` 
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}"
                     onclick="pokePopup(${pokemon.number})"
            </div>
        </li>
    `  
}

function convertPopupPoke(poke){
  // Cria o conteúdo do popup
  const imgPoke = poke.sprites.other.dream_world.front_default
  const contentPoke = `<div class="container">
    <div class="txtPoke">
     ${poke.name}
    </div>
    <div class="imgpoke">
    <img src= ${imgPoke} id="clickImg" >
   </div>
</div>`

  // Abre o popup
  const popup = window.open('', 'popupPoke', 'width=500,height=300,left=100,top=100');

  // Adiciona o conteúdo ao popup
  popup.document.body.innerHTML = contentPoke;
 
  //estiliza o conteudo do popup
  popup.document.head.innerHTML = `<style>
  .container { display: flex; justify-content: space-between;}
  .imgpoke{  float: left; width: 50%;}
  .txtPoke { float: right; width: 50%; text-align: left; font-size: 44px}
  </style>`;
  
}

function pokePopup(poke){
    const url  = "https://pokeapi.co/api/v2/pokemon/"+poke
    return fetch(url)
    .then((response)=>response.json())
    .then(convertPopupPoke)
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

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