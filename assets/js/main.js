const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonInfoWindow = document.getElementById('pokemonInfoWindow')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function pad(number, padSize = 3){
    numberString = number.toString();
    
    if (numberString.length < padSize){
        numberString = numberString.padStart(padSize, "0");
    }

    return numberString
}


function showPokemonInfo(number){
    pokeApi.getPokemon(number).then((pokemon) => {

            console.log(pokemon.eggGroup)
            const modalHTML = 
            `<div class="window ${pokemon.mainType}">
            <div  class="detail ${pokemon.mainType}">
            <span class="buttons">
                <button id="closeInfoButton">←</button>
                <button id="favoritePokemon">♡</button>
            </span>
            <span class = "name">${pokemon.name}</span>
            <div class ="typeList">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <span class = "number">#${pad(pokemon.number)}</span>
            <img src = "${pokemon.image}" class = "detailImage">
        </div>
        
        <div class="stats">
            <span>About</span>
            <ol class = "statsList">
                <li class = "statsListElement">
                    <span class = "statusName">Height</span>
                    <span class = "statusValue">${pokemon.height.toFixed(1)} cm</span>
                </li>
                <li class = "statsListElement">
                    <span class = "statusName">Weight</span>
                    <span class = "statusValue">${pokemon.weight.toFixed(1)} kg</span>
                </li>
                <li class = "statsListElement">
                    <span class = "statusName">Abilities</span>
                    <span class = "statusValue">${pokemon.abilities}</span>
                </li>
                <li class = "statsListElement">
                    <span class = "statusName">Egg Groups</span>
                    <span class = "statusValue"> ${pokemon.eggGroup} </span>
                </li>                                              
                
            </ol>
            
        </div>
        </div>`
            
           pokemonInfoWindow.innerHTML = modalHTML;
           const closeInfoButton   = document.getElementById('closeInfoButton')
           closeInfoButton.addEventListener("click", ()=>{
            pokemonInfoWindow.close();
            pokemonInfoWindow.innerHTML = ""
        })
        });
    
    pokemonInfoWindow.showModal();
   
}


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) =>
        `<li class = "pokemon ${pokemon.mainType}" onclick = showPokemonInfo(${pokemon.number})>
        <span class="number">#${pad(pokemon.number)}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>
        </li>`
        ).join('')
        pokemonList.innerHTML += newHTML
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const recordCountNextPage = offset + limit

    if (recordCountNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit);
    }    
})


