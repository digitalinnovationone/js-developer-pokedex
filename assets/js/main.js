const pokemonLi = document.getElementById('pokemonLi')
const loadMore = document.getElementById('loadMore')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function addZeroes(pokemonOrder) {
    var numberWithZeroes = String(pokemonOrder);
    var counter = numberWithZeroes.length;
      
    while(counter < 3) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
  return numberWithZeroes;
}

function loadPokemonItems(offset, limit){

    // exibe os results
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonLi.innerHTML += pokemonList.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="redirect(${pokemon.id})">
                <span class="number">#${addZeroes(pokemon.id)}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
    })
}

function redirect(id){
    window.open(`./pokemon-detail.html?id=${id}`, "_blank")
}

loadPokemonItems(offset, limit)

//botão Load More
loadMore.addEventListener('click', () => {
    offset += limit
    const qtRecord = offset + limit

    if(qtRecord >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    }else{
        loadPokemonItems(offset, limit)
    }
})