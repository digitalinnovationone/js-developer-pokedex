const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const closeButton = document.getElementById('closeButton')

const limit = 10
let offset = 0;

const pokeInfo = document.getElementById("pokeInfo");
const pokeInfoNumber = document.querySelector(".pokeInfoNumber");
const pokeInfoName = document.querySelector(".pokeInfoName");
const pokeInfoTypes = document.querySelector(".pokeInfoTypes");
const pokeInfoImg = document.querySelector(".pokeInfoImg");
const pokeInfoStats = document.querySelector(".pokeInfoStats");

const overlay = document.querySelector(".overlay");



const maxRecords = 151


function convertPokemonToLi(pokemon) {
    
    const name = pokemon.name
    const number = pokemon.number
    const image = pokemon.img
    const type = pokemon.type
    
    return `<li onclick="getPokemonInfo(${number})" class="pokemon ${type}>
    <span class="number">#${number}</span>
    <span class="name">${name}</span>
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
        </li></a>`
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


function showPokeInfo() {
    pokeInfo.style.opacity = 1;
    pokeInfo.style.pointerEvents = 'auto';
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = 'auto';
    // document.body.style.overflow = 'hidden'
}

function hidePokeInfo(){
    pokeInfo.style.opacity = 0;
    pokeInfo.style.pointerEvents = 'none';
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = 'none';
    // document.body.removeAttribute('style');
}

function closeOverlay() {
    if (overlay.style.opacity === '1') {
        hidePokeInfo();
    }
}

closeButton.addEventListener('click', () => {
    hidePokeInfo();
})

function pokeInfoUpdate(pokemon) {
    
    pokemon = pokemon[0];

    pokeInfoNumber.textContent = `#${pokemon.number}`
    pokeInfoName.textContent = `${pokemon.name}`
    pokeInfoImg.src = pokemon.img

    pokeInfoTypes.innerHTML = '';
    pokeInfoStats.innerHTML = '';

    pokemon.types.map((type) => {
        const li = document.createElement("li")
        li.classList.add('type')
        li.classList.add(type)
        li.appendChild(document.createTextNode(type))
        pokeInfoTypes.appendChild(li);
    })

    pokemon.stats.map((stat) => {
        const li = document.createElement("li")
        li.appendChild(document.createTextNode(stat))
        pokeInfoStats.appendChild(li);
    })


}

function getPokemonInfo(number){
    pokeApi.getPokemons(number-1, 1)
    .then(pokeInfoUpdate)
    .then(showPokeInfo);
}