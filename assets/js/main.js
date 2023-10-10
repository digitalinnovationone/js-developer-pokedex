const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetail = document.getElementById('pokemonDetail')
const closeButton = document.getElementById('buttonClose')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}"">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function detailPokemonModal(pokemon) {
    return ` 
    <div class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>            
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
        <div id="info" class="pokemon-info">
            <table>
                <h4 style="margin-top: 0;">
                    <u>Info</u>
                </h4>    
                <tr>
                    <td>Altura</td>
                    <td>${pokemon.height}</td>
                </tr>
                <tr>
                    <td>Peso</td>
                    <td>${pokemon.weight}</td>
                </tr>
            </table>
            <table>
                <h4>
                    <u>Status</u>
                </h4>
                <tr>
                    <td>Hp</td>
                    <td>${pokemon.stats[0]}</td>
                </tr>    
                <tr>
                    <td>Attack</td>
                    <td>${pokemon.stats[1]}</td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td>${pokemon.stats[2]}</td>
                </tr>
                <tr>
                    <td>Special Atack</td>
                    <td>${pokemon.stats[3]}</td>
                </tr>   
                <tr>
                    <td>Special Defense</td>
                    <td>${pokemon.stats[4]}</td>
                </tr>   
                <tr>
                    <td>Speed</td>
                    <td>${pokemon.stats[5]}</td>
                </tr>                            
            </table>    
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

function loadPokemonDetail(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon)
}

pokemonList.addEventListener("click", (event) => {
    const clickedPokemon = event.target.closest(".pokemon")
    if (clickedPokemon) {
        const pokemonId = clickedPokemon.getAttribute("data-id")
        loadPokemonDetail(pokemonId).then((pokemon) => {
            const details = detailPokemonModal(pokemon)
            pokemonDetail.innerHTML = details
        })
    }    
   openModal()
});

closeButton.addEventListener('click', () => {
    closeModal()
})