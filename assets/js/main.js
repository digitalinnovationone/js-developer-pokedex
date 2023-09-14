const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon card col-md-4 col-lg-3 p-3 ${pokemon.type}">

        <div class="d-flex justify-content-between">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
        </div>
        

        <div class="row justify-content-between">
        <div class="detail col-6 card-body">
            <ol class="types ps-0 me-2 mt-4">
            ${pokemon.types.map((type)=> `<li class="type rounded-pill ms-0 mt-2 p-1 text-center ${type}">${type}</li>`).join(" ")}
            </ol>
        </div>
            <div class="col-6">
                <img class="img-fluid mt-2" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>

        </li>
    `
}

function openPokemonDetails(pokemon) {
    console.log(pokemon)

    const pokemonWindow = window.open('', 'PokemonDetails', 'width=500,height=618');

    const content = `
    <main class="p-4 grass">
    <a onclick="window.close()" class="fs-1 text back"><i class="bi bi-arrow-left"></i></a>
        <h2 class="mt-2">${pokemon.name}</h2>
        <img src="${pokemon.photo}" alt="${pokemon.name}" class="img-fluid">
        <div class="items p-4 rounded">
        <p>IdPokemon: ${pokemon.number}</p>
        <p>Type: ${pokemon.type}</p>
        <p>Abilities: ${pokemon.abilities.join(', ')}</p>
        <p>Moves: ${pokemon.moves.join(', ')}</p>
        </div>
    </main>
    `;

    const headContent = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pokemon.name}</title>
    <!-- Normalize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Font Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet">

    <!-- bs icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <!-- Nosso CSS -->
    <link rel="stylesheet" href="./assets/css/global.css">
    <link rel="stylesheet" href="./assets/css/pokedex.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    `

    pokemonWindow.document.head.innerHTML = headContent;
    pokemonWindow.document.body.innerHTML = content;
    console.log(window.location.origin)
}

let pokemons = [];

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((fetchedPokemons = []) => {
        pokemons = fetchedPokemons;
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    })
}



pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        const index = Array.from(clickedPokemon.parentElement.children).indexOf(clickedPokemon);
        console.log(index)
        console.log(pokemons)

        if (index >= 0 && index < pokemons.length) {
            openPokemonDetails(pokemons[index]);
        } else {
            console.error("Índice inválido");
        }
    }
});

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