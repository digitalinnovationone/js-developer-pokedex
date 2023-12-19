const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="showDetails(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <div class="ancorShow ocult">
                <nav class="navShowInfo">
                    <ul class="ulShowInfo">
                        <li class="liShowInfo activeNav">About</li>
                        <li class="liShowInfo">Base Stats</li>
                        <li class="liShowInfo">Evolution</li>
                        <li class="liShowInfo">Moves</li>
                    </ul>
                </nav>
                <main class="mainShowInfo">
                    <section class="sectionAtributeShowInfo">
                        <div class="pokemonShowInfo">
                            <h5>Species</h5>
                            <h5>Height</h5>
                            <h5>Weight</h5>
                            <h5>Abilities</h5>
                        </div>
                        <div class="pokemonShowInfo dataShowInfo">
                            <h5>Seed</h5>
                            <h5>0,70 cm</h5>
                            <h5>6.9 kg</h5>
                            <h5>Chlorophyl</h5>
                        </div>
                    </section>
                    <h4>Breeding</h4>
                    <section class="sectionAtributeShowInfo">
                        <div class="pokemonShowInfo">
                            <h5>Gender</h5>
                            <h5>Egg Groups</h5>
                            <h5>Egg Cycle</h5>
                        </div>
                        <div class="pokemonShowInfo dataShowInfo">
                            <h5>Male</h5>
                            <h5>Monster</h5>
                            <h5>Grass</h5>
                        </div>
                    </section>
                </main>
            </div>
        </li>
    `;
}

const showDetails = (element) => {
    console.log(element);
    // Toggle the class on the ancorShow element, not the pokemon element
    element.classList.toggle('distak');

    element.querySelector('.ancorShow').classList.toggle('info');
    element.querySelector('.ancorShow').classList.toggle('ocult');
};



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