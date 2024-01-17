const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

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
                <a href="#card-${pokemon.number}">
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                </a>
            </div>
        </li>
        
        <div id="card-${pokemon.number}" class="modal-window cardStats ${pokemon.type}">
            <h2>${pokemon.name}</h2><a href="#" title="Close" class="modal-close">⨉</a>
            <img src="${pokemon.photo}"  alt="${pokemon.name}">
            <ul class="cardStats">
                <li class="cardStats"><p><span class="title">Habilidade 1:</span><span class="value">${pokemon.abilities[0]}</span></p></li>
                <li class="cardStats"><p><span class="title">Habilidade 2:</span><span class="value">${pokemon.abilities[1]}</span></p></li>
                <li class="cardStats"><p class="info ${pokemon.type}">Info</p></li>
                <li class="cardStats"><p><span class="title">HP:</span><span class="value">${pokemon.hp}</span></p></li>
                <li class="cardStats"><p><span class="title">Ataque: </span><span class="value">${pokemon.attack}</span></p></li>
                <li class="cardStats"><p><span class="title">Defesa: </span><span class="value">${pokemon.defense}</span></p></li>
                <li class="cardStats"><p><span class="title">Ataque Especial: </span><span class="value">${pokemon.specialAttack}</span></p></li>
                <li class="cardStats"><p><span class="title">Defesa Especial: </span><span class="value">${pokemon.specialDefense}</span></p></li>
                <li class="cardStats"><p><span class="title">Valocidade: </span><span class="value">${pokemon.specialDefense}</span></p></li>
            </ul>
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

