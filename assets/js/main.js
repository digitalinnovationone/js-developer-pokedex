// Pegar elementos DOM a serem usados
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const detailsModal = document.getElementById('pokemonListDetails')

//Definir limites dos dados que serão requisitados a API
const maxRecords = 151
const limit = 10
let offset = 0;

// Função que cria os card's dinamicamente
function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="tooltip pokemon ${pokemon.type}" ontouch="requestDetail(${pokemon.number})" onclick='requestDetail(${pokemon.number})'>
                <span class="number" >#${pokemon.number}</span>
                <span class="name" >${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
       
                </div>

            </li>
        `).join('');
    })
    setTimeout(() => {
        tooltip()
    }, 1000);
}
// Função que cria os detalhes para o modalDetalhes dinamicamente
function requestDetail(pokemonNumber) {

    pokeApi.getPokemonDetailForModal(pokemonNumber).then((pokemonDetail = []) => {
        detailsModal.innerHTML = `
        <li class="pokemonOpen ${pokemonDetail.type}">
            <span class="nameOpen">${pokemonDetail.name}</span>
            <div id="divButtonClose">
             #${pokemonDetail.number}
                <span class="botaoFechar" onclick="closeModal()" ontouch="closeModal()">&times;</span>
            </div>

            <div class="typesOpen">
                <ol class="typesOpen"><span>Types: </span>
                ${pokemonDetail.types.map((type) => `<span class="typeOpen ${type}">${type}</span>`).join('')}
                </ol>
            </div>
        
            <div class="divSkills">
                <div class="skills"> 
                    <span>skills: </span>                
                    <span class="skillOpen ${pokemonDetail.type}">${pokemonDetail.skill1}</span>
                    <span class="skillOpen ${pokemonDetail.type}">${pokemonDetail.skill2}</span>
                </div>
            </div>

            <div class="imageOpen">
                <img class="images"src="${pokemonDetail.photo}" alt="${pokemonDetail.name}">
            </div>

            <div class="divAtributes">
                <div class="atributesHeader">Atributes:</div>
                <div class="atribute">Hp</div>
                <div class="values">${pokemonDetail.statValueHp}</div>
                <div class="atribute">Attack</div>
                <div class="values">${pokemonDetail.statValueAtk}</div>
                <div class="atribute">Defense</div>
                <div class="values">${pokemonDetail.statValueDef}</div>
                <div class="atribute">special-atk</div>
                <div class="values">${pokemonDetail.statValueSatk}</div>
                <div class="atribute">special-def</div>
                <div class="values">${pokemonDetail.statValueSdef}</div>
                <div class="atribute">Speed</div>
                <div class="values">${pokemonDetail.statValueSpd}</div>

            </div>
        </li>
        `
    })
}


loadPokemonItens(offset, limit) //Função chamada para carregar os primeiros 10 cards

// Função para carregar mais pokemons ao clicar no botão loadMore
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})