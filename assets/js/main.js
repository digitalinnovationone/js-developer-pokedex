const pokemon_List = document.getElementById('pokemonList')
const pokemon_Card = document.getElementById('pokemon-Card')
const content = document.getElementsByClassName('content')
let Pokemon_item
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    const name = pokemon.name

    return `
        <li class="pokemon ${pokemon.type}" onClick="(() => handle('${name}'))()">
        <img class = "bg-image" src="assets/img/icon.svg" alt="bg-image">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type tag">${type}</li>`).join('')}
                </ol>

                <div class="Image">
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
            </div>
        
        </li>
        <div class="Pokemon-details-Modal hide" id="Modal-${pokemon.name}">
        <div class="Pokemon-card-details ${pokemon.type}">
           
       <div class="Pokemon-title">
            <div class="btn-area">
                <button class="btn" onClick="(() => document.getElementById('Modal-${pokemon.name}').classList.add('hide'))()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                </button>
                <i class="fa fa-heart"></i>               
            </div>
           
        <div>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type tag">${type}</li>`).join('')}
                </ol>
            </div>
        </div>
           <span class="number">#${pokemon.number}</span>
       </div>
       <div class="Image">
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
       </div>
       <img class ="bg-image-2" src="assets/img/bg-card.svg"/> 
       <div class="Pokemon-details">
        
                <ul class="titles Pokemon-details-title">
                    <li 
                    class="active" id="${name}-about" onClick="(() => handleOptions('${name}-about','${name}'))()">About</li>
                    <li class="" id="${name}-base-stats" onClick="(() => handleOptions('${name}-base-stats','${name}'))()">Base Stats</li>
                    <li class="" id="${name}-evolution" onClick="(() => handleOptions('${name}-evolution','${name}'))()">Evolution</li>
                    <li class="" id="${name}-moves" onClick="(() => handleOptions('${name}-moves','${name}'))()">Moves</li>
                </ul>

                <div class="Pokemon-details-description">

                    <div class="content-details" id="${name}-about-details">
                        <ul class="Pokemon-details-About">
                            <!-- <li><span>Species</span> Seed</li> -->
                            <li><span>Height</span> ${pokemon.height} cm</li>
                            <li><span>Weight</span>${pokemon.weight} kg</li>
                            <li><span>Abilities</span> 
                            ${

                                pokemon.abilities.map((ability) => `${ability}`).join(', ')
                                
                            }
                            </li>
                        </ul>

                    <!-- <h2>Breding</h2>
                
                        <ul class="Pokemon-details-About">
                            <li><span>Gender</span>${pokemon.gender}</li>
                            <li><span>Height</span> Seed</li>
                            <li><span>Weight</span> Seed</li>
                        </ul> -->
                    </div>

                    <div class="content-details hide" id="${name}-base-stats-details">
                        <ul class="Pokemon-details-About stats">
                            <li><span><span>HP</span> <span>${pokemon.statsValue[0]}</span></span> 
                            <div class="stats-bar red"><span style='width:${(pokemon.statsValue[0]*100)/100}%;'/></div>
                            </li>
                            <li><span><span>Attack</span> <span>${pokemon.statsValue[1]}</span></span> 
                            <div class="stats-bar green"><span style='width:${(pokemon.statsValue[1]*100)/100}%;'/></div>
                            </li>
                            <li><span><span>Defense</span> <span>${pokemon.statsValue[2]}</span></span> 
                            <div class="stats-bar red"><span style='width:${(pokemon.statsValue[2]*100)/100}%;'/></div>
                            </li>
                            <li><span><span>Sp. Attack</span> <span>${pokemon.statsValue[3]}</span></span> 
                            <div class="stats-bar green"><span style='width:${(pokemon.statsValue[3]*100)/100}%;'/></div>
                            </li>
                            <li><span><span>Sp. Defense</span> <span>${pokemon.statsValue[4]}</span></span> 
                            <div class="stats-bar green"><span style='width:${(pokemon.statsValue[4]*100)/100}%;'/></div>
                            </li>
                            <li><span><span>Speed</span> <span>${pokemon.statsValue[5]}</span></span> 
                            <div class="stats-bar red"><span style='width:${(pokemon.statsValue[5]*100)/100}%;'/></div>
                            </li>    
                           
                        </ul>
                    </div>

                    <div class="content-details hide" id="${name}-evolution-details">
                    <ul class="Pokemon-details-About">
                        <li>Evolution content in Development</li>
                                           
                    </ul>
                
                </div>
                    <div class="content-details hide" id="${name}-moves-details">
                        <ul class="Pokemon-details-About">
                        <li> Moves content In Development</li>
                          
                        </ul>
                    
                    </div>
            </div>
       </div>
        </div>
        </div>
    `
}
 
function handle(id) {
   
    const modal = document.getElementById(`Modal-${id}`)
    modal.classList.toggle('hide')
    
}

function handleOptions(option, id){

    const modal = document.getElementById(`Modal-${id}`)


    let allOptions = modal.querySelectorAll(`.content-details`)

    for (let i = 0; i < allOptions.length; i++) {

        allOptions[i].classList.add('hide')
      }
      
    let removeActiveClass = modal.querySelectorAll(`.Pokemon-details-title li`)

    for (let i = 0; i < removeActiveClass.length; i++) {
        removeActiveClass[i].classList.remove('active')
      }
    
    
    const Option = document.getElementById(`${option}-details`)

    Option.classList.toggle('hide')

    const ActiveButton = document.getElementById(`${option}`)
    ActiveButton.classList.toggle('active')

    
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