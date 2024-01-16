const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDialog = document.getElementById('pokemonDialog')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}" id="currentPokemon"  onclick="openInfoPokemon('${pokemon.name}')">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <section class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </section>
            </li>
    `
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


async function openInfoPokemon (namePokemon) {
    const infoPokemon = await  pokeApi.getByPokemonName(namePokemon)

    pokemonDialog.showModal()
    pokemonDialog.className = infoPokemon.about[0].egg_cycle

    pokemonDialog.innerHTML = `<main class="pokemon ${infoPokemon.about[0].egg_cycle}"> 
                                    <header>
                                        <span onclick=closeDialog()>X </span> 
                                        <span> #${ String(infoPokemon.id).padStart(3, '0')} </span>
                                    </header>
                                    

                                    <section class="detail">
                                        <h2>${namePokemon}<h2/> 
                                        <ol class="types">
                                            ${infoPokemon.about[0].types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                        </ol>
                                    </section> 

                                    <figure>
                                        <img src=${infoPokemon.photo} alt='imagem do ${namePokemon}' >
                                    </figure>
                                    <section>
                                        <nav class="navbar">
                                            <a href="#" class="active" onclick="showContentDialog('about')">About</a>
                                            <a href="#" onclick="showContentDialog('status')">Base Stats</a>
                                        </nav>
                                        
                                        <section id="aboutContent" class="dialogSubContent">
                                            <ol class="aboutPokemon">   
                                                 ${infoPokemon.about.map((aboutPokemon)=>{
                                                    if(Array.isArray(aboutPokemon)){
                                                        return aboutPokemon.map((element)=>{
                                                                return  `<li class"type">${element}</li>`
                                                            }).join('')
                                                    }else{

                                                        return Object.entries(aboutPokemon).map(([key,value])=> {
                                                            return `<li> ${key}:  ${value} </li>`}).join('')
                                                    }
                                                }).join('')}
                                            </ol>
                                        </section>
                                    
                                        <section id="statusContent" class="dialogSubContent" style="display: none;">
                                        </section>
                                    </section>
                                </main>`

                                const statusContent = document.getElementById("statusContent");
                                
                                infoPokemon.baseStats.forEach((baseStat) => {
                                    const progressBarElement = createProgressBar(baseStat);
                                    statusContent.appendChild(progressBarElement);
                                });
} 

function createProgressBar(baseStat) {
    const progressBarContainer = document.createElement("div");
    const progressBar = document.createElement("div");
    const paragraphElement = document.createElement("p");
    
    progressBarContainer.className = "progress-bar-container";
    progressBar.className = "progress-bar";
    progressBar.classList.add(baseStat.stat.name);
    progressBar.style.setProperty('--progress', `${baseStat.base_stat}`);

    paragraphElement.textContent = `${baseStat.stat.name}: `;
 
    progressBar.appendChild(paragraphElement);
    progressBarContainer.appendChild(progressBar);

    return progressBarContainer;
}

function showContentDialog(contentId) {
    let contents = document.getElementsByClassName('dialogSubContent');
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }
    
    let selectedContent = document.getElementById(contentId + 'Content');
    if (selectedContent) {
      selectedContent.style.display = 'block';
      selectedContent.style.padding = '13px'
      selectedContent.style.margin = '10px'
    }
  }
  
  function  closeDialog(){  pokemonDialog.close() }