const buttonLoadMore = document.getElementById('buttonLoadMore')
const pokemonOl = document.getElementById("pokemonOl")

const limit = 8
let offset = 0;
maxRecords = 151

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map((pokemon) =>  `
        <li class="pokemon ${pokemon.type}" onclick="redirect(${pokemon.id})">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        </li>
        `).join('')
        pokemonOl.innerHTML += newHtml

        })
}

function redirect(id) {
    window.open(`./detail-pokemon.html?id=${id}`, "_blank")
}

loadPokemonItens(offset, limit)

buttonLoadMore.addEventListener('click', () => {
    offset += limit
    const qtdRecords = offset + limit

    if (qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        buttonLoadMore.parentElement.removeChild(buttonLoadMore)

    } else {
        loadPokemonItens(offset, limit)
    }
})
