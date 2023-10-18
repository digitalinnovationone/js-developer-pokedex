


const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const max = 649;
const limit = 20;
let offset = 0;
const id = 0;


function convertPokemonToLi(pokemon){
   
    return  `
        <li class="pokemon ${pokemon.type}" id="pokemon" onClick=redirectToPokemonDetails(${pokemon.number})>
            <span class="numberH">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
             <div class="detailH">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
    
        </li>`
       
}





function laodPkemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
   })  
}

laodPkemonItens(offset, limit)
    
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit
    if( qtdRecord >= max){
        const newLimit = max - offset 
        laodPkemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        laodPkemonItens(offset, limit)
    }
    
})    

function redirectToPokemonDetails(pokemon) {
    window.location.href = `./detalhe.html?pokemon=${pokemon}`;
}


 



