const pokeList = document.getElementById("pokemon-list");
const btn = document.getElementById("btn")
const limit = 5
let offset = 0

// função para converter os dados da api em html
function convertPokemonToList(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                alt=${pokemon.name}>
        </div>
    </li>
    `;
}

//função para incremetar lista
function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons().then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToList).join('')
    pokemonsList.innerHTML += newHtml
  })
}

loadPokemonItems(offset, limit)

btn.addEventListener('click', () => {
  offset += limit
  loadPokemonItems(offset,limit)
})
/* 
pokeApi.getPokemons().then((pokeApi = []) => {
    const listItemsHtml = []
    for(let i in pokeApi){
        const pokemonsList = pokeApi[i]
        listItemsHtml.push(convertPokemonToHtml(pokemonsList))
    }
})
*/
