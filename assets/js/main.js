const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const backButton = document.getElementById('backButton')
const pokemonsSection = document.getElementById('pokemonsSection')
const detailSection = document.getElementById('detailSection')
const detailContent = document.getElementById('detailContent')
const detailPokemon = document.getElementById('detailPokemon')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="loadPokemonDetail('${pokemon.name}')">
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

var currentPokemonDetail;

backButton.addEventListener('click', () => {
    pokemonsSection.style.display = 'block'
    detailSection.style.display = 'none'
    let el = document.querySelector(`[alt="${currentPokemonDetail}"]`).getBoundingClientRect();

    window.scrollTo(window.scroll, el.top - 200)
})

function convertPokemonToDetail(pokemon) {
    detailPokemon.innerHTML = `
    <div class="headerWrapper">
                    <div class="nameTypes">
                        <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
                    <div class="numberShiny">
                        <span class="number">#${pokemon.number}</span>
                        <svg id="shinyFalse" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sparkles"
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            class="svg-inline--fa fa-sparkles fa-fw fa-xl" onclick="showPokemonShiny()">
                            <path fill="currentColor"
                                d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.8 187.4 205.1 73.3zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z">
                            </path>
                        </svg>
                        <svg id="shinyTrue" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sparkles"
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            class="svg-inline--fa fa-sparkles fa-fw fa-xl" onclick="showPokemonNormal()">
                            <path fill="currentColor"
                                d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.8 187.4 205.1 73.3zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z">
                            </path>
                        </svg>
                    </div>
                </div>

                <div class="contentWrapper">
                    <div class="images">
                        <img id="photo"
                            src="${pokemon.photo}"
                            alt="${pokemon.name}">
                        <img id="photoShiny"
                            src="${pokemon.photoShiny}"
                            alt="${pokemon.name}">
                    </div>
                    <div class="details">
                        <table>
                            <tr class="title">
                                <th>Infos</th>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td>${(parseFloat(pokemon.height)*10)} cm</td>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <td>${(parseFloat(pokemon.weight)*0.1).toFixed(2)} kg</td>
                            </tr>
                            <tr>
                                <th>Abilities</th>
                                <td class="abilities">${pokemon.abilities}</td>
                            </tr>
                        </table>
                    </div>
                </div>
    
    `;

    detailContent.setAttribute('class', `${pokemon.type}`)
    currentPokemonDetail = pokemon.name;
}

function loadPokemonDetail(pokemon) {

    pokeApi.getPokemonDetailByName(pokemon)
        .then((pokemon) => {
            convertPokemonToDetail(pokemon)
            pokemonsSection.style.display = 'none'
            detailSection.style.display = 'block'
        })
}

function showPokemonShiny(){
    const shinyFalse = document.getElementById('shinyFalse');
    const shinyTrue = document.getElementById('shinyTrue');
    const photo = document.getElementById('photo');
    const photoShiny = document.getElementById('photoShiny');

    shinyFalse.style.display = 'none'
    photo.style.display = 'none'
    shinyTrue.style.display = 'block'
    photoShiny.style.display = 'block'
}

function showPokemonNormal(){
    const shinyFalse = document.getElementById('shinyFalse');
    const shinyTrue = document.getElementById('shinyTrue');
    const photo = document.getElementById('photo');
    const photoShiny = document.getElementById('photoShiny');

    shinyFalse.style.display = 'block'
    photo.style.display = 'block'
    shinyTrue.style.display = 'none'
    photoShiny.style.display = 'none'
}