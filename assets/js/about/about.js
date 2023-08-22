// about

// function called when clicked the pokemon <li> item in the main screen
function getPokemon (pokeNumber) {
    const pokemon = {}
    pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}/`
    pokeApiAbout.getPokemonDetail(pokemon)
}
