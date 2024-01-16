const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const TodosPokemons = []

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <a href="#" onClick=mostraDetalhes('${pokemon.name}')>
        <li class="pokemon ${pokemon.type}" >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li></a>
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


//function mostraDetalhes(pokemonName) {
//    var url = `http://127.0.0.1:5500/Pokedex/detalhes.html?name=${pokemonName}`;
//    window.open(url, 'MyWindow', 'width=500,height=500');
//}

document.getElementById('botaopresquisar').addEventListener('click', function () {
    // Capturando o valor do input
    var valorDoInput = document.getElementById('pesquisa').value;
    pokeApi.getPokemons(0, 151).then((pokemons = []) => {
        console.log(pokemons)
        const pokemonPesquisado = pokemons.find((element) => element.name === valorDoInput)
        console.log(pokemonPesquisado)
        if (pokemonPesquisado!=undefined && pokemonPesquisado!=null) {
            const newHtml = convertPokemonToLi(pokemonPesquisado)
            pokemonList.innerHTML = newHtml
        } else {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
            alert('Pokemon não encontrado')
        }

    })

    

})


document.getElementById('button_menu').addEventListener('click', function () {
    // Capturando o valor do input
    window.location.reload()
})