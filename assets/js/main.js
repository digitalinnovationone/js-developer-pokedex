const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 8
let pokeData;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onmouseenter="addBtnMoreInfo(this)" onmouseleave="rmBtnMoreInfo(this)">
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

function showMoreInfo(pokemon) {
    const index = parseInt(pokemon.children[0].innerHTML.split('#')[1]) - 1
    console.log(pokemon.children[0].innerHTML.split('#'))
    document.body.innerHTML = `
        <section class="container-more-info">
            <span class="number">#${pokeData[index].number}</span>
            <span class="name">${pokeData[index].name}</span>

            <ol class="types">
                    ${pokeData[index].types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <ol class="types">
                    ${pokeData[index].abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}
            </ol>

            <ol class="types">
                    ${pokeData[index].sprites.map((img) => `<li class="type ${img}"><img src="${img}" /></li>`).join('')}
            </ol>
            <button onclick="location.reload()">Voltar</button>
        </section>
    `
}

function addBtnMoreInfo(element) {
    const newElement = document.createElement('button')
    newElement.classList.add('pokemon-more-info')
    newElement.innerText = 'Mais informações'
    newElement.addEventListener('click', () => showMoreInfo(element))
    element.appendChild(newElement)
}

function rmBtnMoreInfo(element) {
    new Array(...element.children).forEach((e, index) => {
        if (e.classList.contains('pokemon-more-info')) element.removeChild(element.children[index])
    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons)
        pokeData = pokemons
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