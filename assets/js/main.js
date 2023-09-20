const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.getElementById('content')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    
        <li class="pokemon ${pokemon.type}" onclick="dataPokemon(${pokemon.number})">  
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

function convertPokemons(pokeData) {
    const { id, name, weight, height,
        abilities, attack, defense, speed, image, type, description } = pokeData
    
    return `
        <section id="detail-pokemon-all" class="${type}">            
            <div class="title">
                <span class="number">#${id}</span>
                <span class="name">${name}</span>
                    <img
                    src="${image}"
                    alt="${name}"
                    />                    
            </div>        
            <div class="detail-pokemon">
                <span>
                    ${description}
                </span>
                <ul>
                    <li>Altura: ${height}</li>
                    <li>Peso: ${weight}</li>
                    <li>Ataque: ${attack}</li>
                    <li>Defesa: ${defense}</li>
                    <li>Velocidade: ${speed}</li>
                    <li>Habilidade: ${abilities.ability.name}</li>
                </ul>
            </div>
        </section>
        <div class="pagination">
            <button type="button" onclick="reload()")>
                Voltar
            </button>
        </div>
    `
}

async function dataPokemon(number) {    
    const description = await pokeApi.getDescription(number)
    const listPokemon = await pokeApi.getSinglePokemon(number).then(res => convertPokemons({ ...res, description: description }))
    content.innerHTML =  listPokemon       

}

function reload(){
    window.location.reload(true);
}

