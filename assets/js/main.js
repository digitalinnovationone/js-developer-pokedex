const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let liList = [];
let currentPokemons = []

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
        currentPokemons.push(...pokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        liList = [...document.querySelector('#pokemonList').children]
        liList.map((item) => item.addEventListener('click', ()=> 
            showDetail( item.querySelector('span.number').innerText.slice(1) )
        ))
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

function showDetail(id){ 
    const [pokeDetail] = currentPokemons.filter((pokemon) => pokemon.number == id )
    let modal = document.querySelector('#modalShowDatail')
    console.log(pokeDetail)
    const html = createModalPokemon(pokeDetail)
    modal.innerHTML = html
    const btnModal = document.querySelector("#btnModal");
    btnModal.click();
}





function createModalPokemon(pokemon){  
    return`
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body ${pokemon.type}">
                    <section>
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
            
                        <div class="description">
                            <h1 class="name"> ${pokemon.name} </h1>
                            <span class="number"> <span>#${pokemon.number} </span> </span>
            
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
            
                        <div class="img-pokemon">
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                        
                    </section>
                    <div class="modal-detail">
                        <div class="modal-detail-content">
                            <h6>🥷🏽 Experiência </h6>
                            <p class="textInfo">XP-${pokemon.experience} </p>
                            <hr>
                            <h6>🏹 Habilidades </h6>
                            <ul>
                                ${pokemon.abilities.map((abilitie) => `<li class="textInfo">${abilitie}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}