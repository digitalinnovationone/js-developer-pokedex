const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const modal = document.querySelector("dialog");

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

                <button class="openDialog">Abrir Diálogo</button>
            
        </li>      
    `
}

document.addEventListener('DOMContentLoaded', function () {
    const openDialogButtons = document.querySelectorAll('.openDialog');
    const meuDialogo = document.getElementById('meuDialogo');

    function abrirDialogo() {
        meuDialogo.showModal();
    }

    openDialogButtons.forEach(botao => {
        botao.addEventListener('click', abrirDialogo);
    });

    function fecharDialogo() {
        meuDialogo.close();
    }
})

// // Função para abrir o diálogo
// function abrirDialogo() {
//     modal.showModal();
// }

// // Função para fechar o diálogo
// function fecharDialogo() {
//     modal.close();
// }

// // Selecionar todos os botões "showDetail" e adicionar evento de clique a cada um
// const showDetailButtons = document.querySelectorAll('.showDetail');
// showDetailButtons.forEach(button => {
//     button.addEventListener('click', abrirDialogo);
// });

// // Selecionar todos os botões "openDialog" e adicionar evento de clique a cada um
// const openDialogButtons = document.querySelectorAll('.openDialog');
// openDialogButtons.forEach(button => {
//     button.addEventListener('click', abrirDialogo);
// });


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
