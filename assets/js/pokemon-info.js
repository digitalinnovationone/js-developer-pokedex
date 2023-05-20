//const pokemonList = document.getElementById('pokemonList')
//const loadMoreButton = document.getElementById('loadMoreButton')
const id = new URL(window.location.href).searchParams.get('id');

const pokemonInfo = document.getElementById('pokemonInfo')


function loadPokemonInfo(id) {
    pokeApi.getPokemonInfo(id).then((pokemon) => {
        const newHtml = `
            <div class="col pokemonHeader ${pokemon.type}">
                <div class="header">
                    <button id="backButton" type="button"><i class="fa-solid fa-arrow-left"></i></button> 
                    <span class="number ${pokemon.type}">#${pokemon.number}</span>   
                </div>
                <h1>${pokemon.name}</h1>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="col pokemonStats">
                <div class="btns">
                    <button id="infoButton" disabled>Information</button>
                    <button id="statsButton">Stats</button>
                </div>
                <div id="Information" class="tabcontent">
                    <label>Peso:</label> 
                    <p class="infoText">${pokemon.weight/10}Kg</p>
                    <label>Altura:</label>
                    <p class="infoText">${pokemon.height/10}m</p>
                    <h2>Abilities</h2>
                    <ol class="abilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                    </ol>
                </div>

                <div id="Stats" class="tabcontent display">
                <ol class="stats">
                    ${pokemon.stats.map((stat) => `
                    <li class="stat">${stat.split('|')[0].replace('-', ' ')}
                        <div class="bar">
                            <div class="skills ${pokemon.type}" style="max-width: ${stat.split('|')[1]}%; ">${stat.split('|')[1]}</div>
                        </div>
                    </li>`).join('')}
                </ol> 
                </div>
         
            </div>
            `


        pokemonInfo.innerHTML = newHtml

        const backButton = document.getElementById('backButton')
        backButton.addEventListener('click', () => {
            history.back()
        })
        
        const statsContent = document.getElementById('Stats')
        const infoContent = document.getElementById('Information')
        
        const infoButton = document.getElementById('infoButton')
        const statsButton = document.getElementById('statsButton')

        infoButton.addEventListener('click', () => {
            infoContent.classList.toggle('display')
            statsContent.classList.toggle('display')
            infoButton.disabled = true
            statsButton.disabled = false

        })
        statsButton.addEventListener('click', () => {
            statsContent.classList.toggle('display')
            infoContent.classList.toggle('display')

            infoButton.disabled = false
            statsButton.disabled = true


        })
    })
        .catch((error) => console.error(error))
        .finally(() => console.log('Requisição Concluida!'))
}

loadPokemonInfo(id)
  
 
