const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const showDetail = document.querySelectorAll(".showDetail")
const buttonsOpenDialog = document.querySelectorAll(".openDialog")
const modal =  document.querySelector("dialog")

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    modal.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            
            <img src="${pokemon.photo}"
                    alt ="${pokemon.name}">
        </div>
    `

    return `
        <li class="pokemon ${pokemon.type}" id="poke"">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}"
                            alt ="${pokemon.name}">
                </div>

            <button class="showDetail">Abrir Diálogo</button>
            
        </li>

        
    `
}

// Função para abrir o diálogo
function abrirDialogo() {
    modal.showModal();
}

// Função para fechar o diálogo
function fecharDialogo() {
    modal.close();
}

buttonsOpenDialog.forEach(botao => {
    botao.addEventListener('click', abrirDialogo);
});

showDetail.forEach(botao => {
    botao.addEventListener('click', abrirDialogo);
});

// fecharDialogo.addEventListener('click', fecharDialogo);


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

showDetail.addEventListener('click', () => {
    modal.showModal()
})
