
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// Convert details pokemon
pokeApi.convertDetails = (pokemon) =>{
    const imagePokemon = pokemon.sprites.front_default
    const pokemonDetail = new PokemonDetails(
        pokemon.name,
            pokemon.order,
                pokemon.height,
                    pokemon.weight,
                        pokemon.stats,
                            pokemon.types,
                                imagePokemon)
    
    return pokemonDetail
}

// View details pokemons
pokeApi.viewDetails = (pokemon)=>{
    const typeColor = pokemon.types[0].type.name
    
    // Formatando peso e altura
    pokemon.weight = pokemon.weight / 10 
    pokemon.height = pokemon.height / 10


    return `
        <section class="modalPoke ${typeColor}">
            <div class="header">
                <span class="number">#${pokemon.order}</span>
                <h1 class="namePoke">${pokemon.name}</h1>
            </div>

            <div class="image">
                <img class="imagePoke" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="deitalsAndPower">
                <div class="detailsBox">
                    <h2 class="detailsTitle">
                        Details
                    </h2>
                    
                    <div class="detailsWidth">
                        <span class="detailText ${typeColor}" id="width">
                            ${pokemon.height} M
                        </span>
                        <span class="detailText ${typeColor}" id="height">
                            ${pokemon.weight} KG
                        </span>
                    </div>
                </div>

                <div class="types">
                    <h2>
                        Powers Pokemon
                    </h2>
                    <ul class="typesList">
                        ${viewPower(pokemon.types)}
                    </ul>
                </div>
            </div>


            <div class="statusPoke">
                <h1 class="namePoke">
                    Status ${pokemon.name}
                </h1>
                ${viewStatus(pokemon.status)}
            </div>
            

            <div class="buttonRemove">
                <button onclick="removePokeDetails()" class="btnRemove">
                    Sair
                </button>
            </div>
        </section>
    `
}

let removePokeDetails = ()=>{ // Remove modal
    const modalPoke = document.querySelector('.modalPoke')
    modalPoke.remove()
}

let viewStatus = (statusPoke) =>{ // View status poke
    return statusPoke.map((statusI) =>{
        const valueStatus = statusI.base_stat
        const nameStatus = statusI.stat.name
        
        return `
        <div class="statusBox">
            <h3 class="titleStatus">${nameStatus}</h3>
            <div class="box ${nameStatus}">${valueStatus}%</div>
        </div>`
    }).join('')
}

let viewPower = (typePokemon) =>{ // View powers poke
    return typePokemon.map((typePoke) => {
        const typeName = typePoke.type.name;
        return `
        <li class="typeItem ${typeName}">
            ${typeName}
        </li>`
    }).join('')
}