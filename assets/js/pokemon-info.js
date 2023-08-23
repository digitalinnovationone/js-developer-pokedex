const pokemon = document.getElementById('pokemonList');
const buttonPagination = document.querySelector(".pagination");

const getPokemon = async (elem) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${elem}`)
  const data = await pokemon.json()
  return data
}

const convertPokemon = (pokemon) => {
  return `
    <h1>${pokemon.name}</h1>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"><br>
    <h2>Abilities:</h2>
    <ul>
      ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
    </ul>
  `
}

pokemon.addEventListener('click', async (event) => {
  const pokemonCard = event.target.closest('.pokemon');
  const secondSpan = pokemonCard.querySelector(".name").innerText
  const resultPokemon = await getPokemon(secondSpan.toLowerCase());

  pokemon.removeAttribute(".pokemon")
  pokemon.innerHTML = convertPokemon(resultPokemon)
  
  buttonPagination.removeAttribute("#loadMoreButton")
  buttonPagination.innerHTML = "Todos os direitos reservados a Pokémon Company."
});


