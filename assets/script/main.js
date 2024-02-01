const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0




function loadPokemonItem(offset, limit){
        pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHTML = pokemons.map(pokemon => `
                <li class="pokemon ${pokemon.type}">
                    <span class="nunber">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            `).join('')
            pokemonList.innerHTML += newHTML
        })       
}

loadPokemonItem(offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit

    const qtddRecordsmaxPage = offset + limit
    if(qtddRecordsmaxPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItem(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else{

        loadPokemonItem(offset, limit)
    }
})