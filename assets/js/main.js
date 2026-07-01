const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const feedbackMessage = document.getElementById('feedbackMessage')

const maxRecords = 151
const limit = 10
let offset = 0;
let isLoading = false

function setFeedback(message, isError = false) {
    feedbackMessage.textContent = message
    feedbackMessage.classList.toggle('error', isError)
}

function setLoadingState(loading) {
    isLoading = loading
    loadMoreButton.disabled = loading
    loadMoreButton.textContent = loading ? 'Loading...' : 'Load More'
    if (loading) {
        setFeedback('Carregando Pokémon...')
    }
}

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

async function loadPokemonItens(offset, limit) {
    try {
        setLoadingState(true)
        const pokemons = await pokeApi.getPokemons(offset, limit)
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        setFeedback('')
        return true
    } catch (error) {
        setFeedback('Não foi possível carregar os Pokémon. Tente novamente.', true)
        console.error(error)
        return false
    } finally {
        setLoadingState(false)
    }
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', async () => {
    if (isLoading) {
        return
    }

    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        const loadedSuccessfully = await loadPokemonItens(offset, newLimit)

        if (loadedSuccessfully) {
            loadMoreButton.parentElement.removeChild(loadMoreButton)
            setFeedback('Você chegou ao final da lista de Pokémon.')
        }
    } else {
        loadPokemonItens(offset, limit)
    }
})
