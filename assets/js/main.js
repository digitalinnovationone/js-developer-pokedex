const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let offset = 0
const limit = 5
const maxRecords = 151

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <button class="detailsBtn">details</button>
            </li>
        `).join('');

        pokemonList.innerHTML += newHtml;

        // Attach event listeners for the "details" button
        let btnDetails = document.getElementsByClassName("detailsBtn");
        Array.from(btnDetails).forEach(function (btn) {
            btn.addEventListener('click', function () {
                modal.style.display = "block";
                // You can also access the specific button that was clicked as 'btn'
                console.log("Button clicked:", btn);
            });
        });
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qntRecordNextPage = offset + limit
     
    if(qntRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset 
        loadPokemonItens(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else {
        loadPokemonItens(offset,limit)
    }
    
})


let modal = document.getElementById("detailModal")
let btnClose = document.getElementById("close")
let closeModalBackdrop = document.getElementById("contentPokemon")

btnClose.onclick = function() {
    modal.style.display = "none"
}

