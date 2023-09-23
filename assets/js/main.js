const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonInfo = document.getElementById('pokemon-info')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
            <div class="btn-stats">
                <button type="button" onclick="myfunction(${pokemon.number})">
                    Show stats...
                </button>
            </div>

        </li>
    `
}

$('.modal').on('hidden.bs.modal', function(e)
{ 
    $(this).empty();
}) ;

function load_pokemon_modal_information(pokemon) {
return `

    <div class="pokedex pokemon ${pokemon.type}">
        <div class="detail">
            <ul class="stats">
                Base Stats
                ${pokemon.stats.map((stat) =>
                    `<li class="stat">${stat.stat.name} ${stat.base_stat}</li>`).join('')
                }
            </ul>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div> 

        <div class="btn-stats">
            <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        </div>
    </div>
</div>
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

function myfunction(pokemon_number){
    console.log("Poke number " + pokemon_number)

    request_pokemon_info(pokemon_number).then((pokemon) => {
        const newHtml = load_pokemon_modal_information(pokemon);
        console.log(pokemon);
        $("#JanelaModal").append(newHtml);
    });

    $("#JanelaModal").modal(); 
}