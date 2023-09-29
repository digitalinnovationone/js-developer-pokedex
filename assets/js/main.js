const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span id="${pokemon.name}" class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img class="photo" src="${pokemon.photo}"
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

function addEvents(){
    const elements = document.getElementsByClassName("name");

    for (let el of elements) {
        el.addEventListener("click", () => {
            let pokemoName = el.innerHTML
            let pokemon = JSON.parse(sessionStorage.getItem(pokemoName));
            message = `
                <div id="sobreposicao" class="overlay">
                    <li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span id="${pokemoName}" class="name">${pokemoName}</span>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.abilities.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                            <img class="photo" src="${pokemon.alternativePhoto}"
                                alt="${pokemoName}">
                        </div>
                    </li>
                
                </div>
            `
            if (document.getElementById("sobreposicao") != null ){
                document.getElementById("sobreposicao").remove()
            }
            document.body.insertAdjacentHTML("beforeend", message)         
            document.getElementById("sobreposicao").addEventListener("click", () => {
                document.getElementById("sobreposicao").remove()
            })
        })
    }

}

addEvents()
