import pokeApi from "./poke-api.js"
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonSelected = document.getElementById('selectedPokemons')

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

pokemonList.addEventListener('click', (event) => {
    const pokemon = event.target.closest('.pokemon')
    if (pokemon) {
        console.log(pokemon)
        const pokemonNumber = pokemon.querySelector('.number').textContent
        const pokemonName = pokemon.querySelector('.name').textContent
        const pokemonTypes = Array.from(pokemon.querySelectorAll('.type')).map(type => type.textContent)
        const pokemonPhoto = pokemon.querySelector('img').src
        console.log(pokemonNumber, pokemonName, pokemonTypes, pokemonPhoto)
        pokemonSelected.innerHTML = convertPokemonToLi({
            number: pokemonNumber,
            name: pokemonName,
            type: pokemonTypes[0],
            types: pokemonTypes,
            photo: pokemonPhoto
        })


        pokemonSelected.classList.add('animate-card')
        setTimeout(() => {
            pokemonSelected.classList.remove('animate-card')
        }, 1000)
    }
})

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