const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');

let offset = 0;
const limit = 10;
const MAX_RECORDS = 151;

function loadMorePokemonItens(offset, limit) {
    pokeApi.getAll(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
                                            <li class="pokemon ${pokemon.mainType}">
                                                <span class="number">#${pokemon.number}</span>
                                                <span class="name">
                                                    ${pokemon.name}
                                                </span>
                                    
                                                <div class="details">
                                                    <ol class="types">
                                                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                                    </ol>      
                                                    <img src="${pokemon.image}" alt="${pokemon.name}">
                                                </div>
                                            </li>
                                            `
                                        ).join('')
    });    
}

loadMorePokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    // debugger
    offset += limit;
    const qtRecordsOnNextPage = offset + limit;
    
    if (qtRecordsOnNextPage >= MAX_RECORDS) {
        const newLimit = MAX_RECORDS - offset; 
        loadMorePokemonItens(offset, newLimit);   
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadMorePokemonItens(offset, limit); 
    }
});
