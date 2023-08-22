const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li onclick="openDetails(this)" class="pokemon ${pokemon.type}">
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

function openDetails(el){
   pokeApi.getIndividual(el)
}

function criaHtmlModal(pokemon){
    return `
 <div id="myModal" class="modal">
  <div class="modal-content ${pokemon.type}">
    <span class="close" id="closeModalBtn">&times;</span>
    <h1>${pokemon.name}</h1>
    <h2>#${pokemon.number}</h2>
    <div class="abilities">
    <ol>
    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>
    <ol>
    ${pokemon.abilities.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol></div>
    <img src=${pokemon.photo} alt="Imagem do pokemon">
    <div class="stats">
    <span>
    weight:${pokemon.weight}
    </span>
    <span>
    height:${pokemon.height}
    </span>
    </div>
  </div>
</div>
`
}