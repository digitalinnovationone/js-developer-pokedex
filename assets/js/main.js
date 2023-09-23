const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="selectPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number.toString().padStart(3,'0')}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     
            </div>

        </li>
     
    `
}

const selectPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    displayPopup(pokemon)
}

const displayPopup = (pokemon) => {
 
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
 
    const photo = pokemon.sprites.other.dream_world.front_default
    const htmlString = `
    <div id="popup">
        <div id="detailPokemon">
            <button id="closeBtn" onClick="closePopup()">Close</button>
            <li class="pokemon ${pokemon.type}">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img id="img-pokemon" src="${photo}"alt="${pokemon.name}">

            <div id="data">
                 <h4>Base Stats</h4>
                 <div id="hability">
                 <div class="stat-desc">
                  ${pokemon.stats.map((name_stats) =>`<p class="${type}">${name_stats.stat.name}</p>`).join('')}
                 </div>
                 <div class="bar-inner"> ${pokemon.stats.map((base_stats) =>`<p class="${type}">${base_stats.base_stat}</p>`).join('')}</div>
                 </div>
                 <div id="stats">
                     <div class="stat-bar">
                         <p>Height: ${(pokemon.height/10).toFixed(2)}m</p>
                         <p>Weight: ${(pokemon.weight/10)}kg</p>
                       </div>
                </div>
             </div>
           </div>
        </div>
     </li>
    `

    pokemonList.innerHTML = htmlString + pokemonList.innerHTML
}

const closePopup = () => {
    const popup = document.getElementById('popup')
    popup.parentElement.removeChild(popup);
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

let pokeSelect = document.querySelector('#poke-filter').addEventListener("click", filterByType)

// Filter Pokemon
function filterByType (e){
    let filterType = document.querySelector('#poke-filter')
    let pokeValue = filterType.value
    //let ele = e.target.value
    let selectedType = pokemonList.getElementsByClassName("pokemon")
    let selectedTypeArr = Array.from(selectedType)
    selectedTypeArr.forEach(function(e){
        
        if (e.classList.contains(pokeValue)){
            e.style.display = "flex"
        } else {
            e.style.display = "none"
        }
        if (pokeValue == "all"){
           e.style.display = "flex"
        }
    })
    
}