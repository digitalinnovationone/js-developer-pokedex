let currentListIndex
let pokemonListLimit = 20
window.onload = buildList

async function buildList() {
        currentListIndex = 0
        await construirLista()
        renderizarItemPokemon(currentPokeList, currentListIndex, pokemonListLimit)
        nextPage.disabled = false
}

function cleanList() {
        const pokedex = document.querySelector('main')
        const divCarregando = document.getElementById('load')
        while (pokedex.hasChildNodes() && pokedex.lastChild !== divCarregando) {
                pokedex.removeChild(pokedex.lastChild)
        }

        divCarregando.setAttribute('style', 'display:block')
}

const resetList = document.getElementById('btn-reset')
resetList.addEventListener('click', () => {
        cleanList()
        buildList()
})


const nextPage = document.getElementById('btn-next')
nextPage.addEventListener('click', () => {
        if (previousPage.disabled === true) previousPage.disabled = false

        currentListIndex += pokemonListLimit
        renderizarItemPokemon(currentPokeList, currentListIndex, pokemonListLimit)

        if (currentListIndex >= currentPokeList.length - 1) nextPage.disabled = true
})

const previousPage = document.getElementById('btn-prev')
previousPage.addEventListener('click', () => {
        if (nextPage.disabled === true) nextPage.disabled = false

        currentListIndex -= pokemonListLimit
        renderizarItemPokemon(currentPokeList, currentListIndex, pokemonListLimit)

        if (currentListIndex === 0) previousPage.disabled = true
})
function createList() {
        const filterOption = document.querySelector('input[name="filter"]:checked')?.value
        const searchValue = document.getElementById('src-poke').value

        if (!filterOption) {
                alert('Escolha um filtro para pesquisa.')
                return false
        }

        currentListIndex = 0

        const filteredList = filterPokedex(filterOption, searchValue)
        renderizarItemPokemon(filteredList, currentListIndex, pokemonListLimit)

        if (filteredList.Length < 20) nextPage.disabled = true
}

