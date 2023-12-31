const pokemonList = document.getElementById("pokemonList")
const loadMoreBTN = document.getElementById("loadMoreButton")
const modalWrapper = document.querySelector(".modal-wrapper")
const btnCloseModal = document.querySelector(".close-modal-btn")
const limit = 5
const maxContent = 151
let offset = 0

function convertPokemonTypeToHTML(pokemonTypes){   
    return pokemonTypes.map(name => `<li class="type ${name}">${name}</li>`)
}

function convertPokemonAbilitiesToHTML(pokemonAbilities, type){   
    return pokemonAbilities.map(ability => `<li class="${type}">${ability}</li>`)
}

function loadPokemon(offset, limit){

    function convertPokemonToHTML(pokemon){
        return `
        <li class="pokemon ${pokemon.type}" id = ${pokemon.number}>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypeToHTML(pokemon.types).join("\n")}
                </ol>
                <img src=${pokemon.image} alt=${pokemon.name}>
            </div>
        </li>`
    }

    PokeApi.getPokemons(offset, limit).then((pokemons) => {
        const listItems = pokemons.map(pokemon => convertPokemonToHTML(pokemon))
        newHTMLContent = listItems.join("\n")
        pokemonList.innerHTML += newHTMLContent

})}

loadPokemon(offset, limit)

loadMoreBTN.addEventListener("click", () => {
    offset += limit
    const totalContentWithNextPage = offset + limit

    if (totalContentWithNextPage >= maxContent) {
        const newLimit = maxContent - offset
        loadPokemon(offset, newLimit)

        loadMoreBTN.classList.add("hide")
        return 
    }
    
    loadPokemon(offset, limit)
})


pokemonList.addEventListener("click", (event) => {
    const clickedElement = event.target.closest('.pokemon')
    if (clickedElement) {
        event.preventDefault()
        const selectedPokemon = PokemonsData[clickedElement.id]
        modalWrapper.classList.add("open")

        function convertPokemonToHTML(pokemon){
            return `
            <div class="modal-card">
                <div class="infos ${pokemon.type}">
                    <button class="close-modal-btn">X</button>
                    <div class = "card-title"> 
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <ol class="types">
                        ${convertPokemonTypeToHTML(pokemon.types).join("\n")}
                    </ol>
                    <img src=${pokemon.image} alt=${pokemon.name}>
                </div>

                <div class="abilities">
                    <span class="title-section ${pokemon.type}">Abilities</span>
                    <ol class="pokemon-abilities">
                        ${convertPokemonAbilitiesToHTML(pokemon.abilities, pokemon.type).join("\n")}
                    </ol>
                </div>
            </div>`
        }

        const newHTMLContent = convertPokemonToHTML(selectedPokemon)
        modalWrapper.innerHTML = newHTMLContent
    }
})

modalWrapper.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.close-modal-btn');
    
    if (clickedButton) {
        modalWrapper.classList.remove("open")
    }
  });
