const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 386;
const limit = 10;
let offset = 0;

function pokemonInfo(pokemonData) {
    
    var modal = document.getElementById("myModal");
    var modalBody = modal.querySelector(".modal-body");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function createListWithSeparator1(array, separator) {
        return array.split(',').map(item => `<li class="item">${item}</li>`).join(separator);
    }

    function createListWithSeparator2(array, separator) {
        return array.split(',').map(item => `<li class="order">${item}</li>`).join(separator);
    }

    var pokemon = JSON.parse(pokemonData);
    var abilitiesList = createListWithSeparator1(pokemon.abilities[0], '');
    var typesList = createListWithSeparator1(pokemon.types[0], '');
    var statsList = createListWithSeparator2(pokemon.stats[0], '');
    var movesList = createListWithSeparator2(pokemon.moves[0], '');

    modalBody.innerHTML = `
        
        <section class=headerBox>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <div class="headerBoxInside">
       
                <h2 class="nameBox">${pokemon.name}</h2>
                <p class="numberBox">#${pokemon.number}</p>
        
            </div>
        </section>

        <h3 class="abilitiesBox">--> Abilities <--</h3>
       
        <div class="things1">
            ${abilitiesList}
        </div>
        
        <h3 class="typesBox">->> Type <--</h3>
        
        <div class="things1">
            ${typesList}
        </div>

        <h3 class="statsBox">--> Stats <--</h3>
        
        <div class="things2">
            ${statsList}
        </div>

        <h3 class="movesBox">--> Moves <--</h3>
        
        <div class="things2">
            ${movesList}
        </div>
    `;
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-name='{"name": "${pokemon.name}", "number": "${pokemon.number}", "stats": ["${pokemon.stats}"], "moves": ["${pokemon.moves}"], "types": ["${pokemon.types}"], "abilities": ["${pokemon.abilities}"], "photo": "${pokemon.photo}"}' onclick="pokemonInfo(this.dataset.name)">
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