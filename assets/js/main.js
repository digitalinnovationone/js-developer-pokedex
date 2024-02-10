const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonInfoWindow = document.getElementById('pokemonInfoWindow')
const closeInfoButton   = document.getElementById('closeInfoButton')
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

//Implementar essa função para mostra as informações. Criar outra função para fazer o fetch e consumir a api, outra para organizar os dados e popular a modal e depois mostar a modal
function showPokemonInfo(number){
    console.log("clicked!")
    pokemonInfoWindow.showModal();
    console.log("Modal showed")
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


closeInfoButton.addEventListener("click", ()=>{
    pokemonInfoWindow.close();
})