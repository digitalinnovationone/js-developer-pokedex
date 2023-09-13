const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const currentPokemonInfo = document.getElementById('currentPokemonInfo')

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
            <ul class="characteristics">
                <li>Height: ${pokemon.height} m</li>
                <li>Weight: ${pokemon.weight} kg</li>
            </ul>
            <div class="statsWindow">
                <h3>Base Stats</h3>
                <table class="stats">
                    <tr>
                        <td>HP</td>
                        <td>${pokemon.base_stats.hp}</td>                       
                    </tr>
            </div>
            <td>Attack</td>
                        <td>${pokemon.base_stats.attack}</td>
                    </tr>                    
                    <tr>
                        <td>Defense</td>
                        <td>${pokemon.base_stats.defense}</td>
                    </tr>
                    <tr>
                        <td>Sp. Atk.</td>
                        <td>"${pokemon.base_stats.specialAttak}"</td>
                    </tr>
                    <tr>
                        <td>Sp. Def.</td>
                        <td>${pokemon.base_stats.specialDefense}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>${pokemon.base_stats.speed}</td>
                    </tr>
                </table>

        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
function loadPokeDetails(pokeId) {
    if (pokeId > 0) {
        pokeApi.getPokemons(pokeId-1, 1)
        .then((pokemon) =>{
            const newHtml = pokemon.map(convertPokemonToDetailed)
                currentPokemonInfo.innerHTML = newHtml
        })
        window.scrollTo(0,0)
    }
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