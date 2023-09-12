
/*
function ConvertPokeTypes(pokemonsTypes) {
    return pokemonsTypes.map ((typeSlot) => `<li class="types">${type}</li>`)
}

/* Converter a Lista para HTML*/
const pokemonList = document.getElementById ('pokemonList')
const Carregar  = document.getElementById("Carregar")

const MAXIMOPOKE = 151
const limit = 15
let offset = 0;


function ConverterPokeHTML (pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
                <spam class="number">#${pokemon.numero}</spam>
                <spam class="name">${pokemon.nome}</spam>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.foto}" 
                    alt=${pokemon.nome}>
                </div>
                
            </li>
    `
}

function CarregarPokemons (offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = [] ) => {
        const novoHTML = pokemons.map (ConverterPokeHTML).join ('')
        pokemonList.innerHTML += novoHTML
    })
}

CarregarPokemons (offset, limit)

Carregar.addEventListener("click", () => {
    offset += limit
    
    const qtdRegistro = offset + limit

    if (qtdRegistro >= MAXIMOPOKE ) {
        const novolimite = MAXIMOPOKE - offset
        CarregarPokemons (offset, novolimite)
        
        Carregar.parentElement.removeChild(Carregar)

    } else {CarregarPokemons (offset, limit)}
})

