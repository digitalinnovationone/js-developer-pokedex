const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detalhesModal = document.getElementById('pokemonDetalhes')
const conteudo = document.querySelector(".content");

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
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

//evento click na lista
conteudo.addEventListener('click', function (e) {
    const pokemonSelecionado = e.target.closest("li")
    const pokemonId = pokemonSelecionado.id   

        if(typeof parseInt(pokemonId) == 'number' && pokemonId !== ''){
            getDetalhes(pokemonId);

        }    
})

function getDetalhes(pokemonNumber) {

    pokeApi.getPokemonModal(pokemonNumber).then((detalhes = []) => {
        detalhesModal.innerHTML = `
        <li class="pokemonOpen ${detalhes.type}">
            <span class="nameOpen">${detalhes.name}</span>
            <div id="divButtonClose">
             #${detalhes.number}
                <span class="botaoFechar" onclick="closeModal()" ontouch="closeModal()">&times;</span>
            </div>

            <div class="typesOpen">
                <ol class="typesOpen"><span>Types: </span>
                ${detalhes.types.map((type) => `<span class="typeOpen ${type}">${type}</span>`).join('')}
                </ol>
            </div>
        
            <div class="divSkills">
                <div class="skills"> 
                    <span>skills: </span>                
                    <span class="skillOpen ${detalhes.type}">${detalhes.skill1}</span>
                    <span class="skillOpen ${detalhes.type}">${detalhes.skill2}</span>
                </div>
            </div>

            <div class="imageOpen">
                <img class="images"src="${detalhes.photo}" alt="${detalhes.name}">
            </div>

            <div class="divAtributes">
                <div class="atributesHeader">Atributes:</div>
                <div class="atribute">Hp</div>
                <div class="values">${detalhes.statValueHp}</div>
                <div class="atribute">Attack</div>
                <div class="values">${detalhes.statValueAtk}</div>
                <div class="atribute">Defense</div>
                <div class="values">${detalhes.statValueDef}</div>
                <div class="atribute">special-atk</div>
                <div class="values">${detalhes.statValueSatk}</div>
                <div class="atribute">special-def</div>
                <div class="values">${detalhes.statValueSdef}</div>
                <div class="atribute">Speed</div>
                <div class="values">${detalhes.statValueSpd}</div>

            </div>
        </li>
        `
    })
}
