const pokeDetail = document.getElementById("pokeDetail");
const statusPokemos = document.querySelector(".statusPokemos");



function showPokemonDetails(pokemon) {
    statusPokemos.innerHTML = `
    <div class="${pokemon.type}"
    <header><h1>Pokemon</h1></header>
        <img src="${pokemon.photo}" alt="${pokemon.name}" class="detailImg">
        <h3> ${pokemon.name}</h3>
        <ul class="alturaEpeso">
        <li><strong>Altura:</strong> ${pokemon.altura}</li>
        <li><strong>Peso:</strong> ${pokemon.peso}</li>
        </ul>
        <ul class="alturaEpeso">
        <li><strong>HP:</strong> ${pokemon.hp}</li>
         
        <li><strong>Ataque:</strong> ${pokemon.attack}</li>
       
        <li><strong>Defesa:</strong> ${pokemon.defense}</li>
      
        <li><strong>speed:</strong> ${pokemon.speed}</li>
        </ul>
        <br>
    </div> 
    `;

    pokeDetail.style.display = 'flex';
}

pokeDetail.addEventListener('click', (event) => {
    if (event.target === pokeDetail) {
        pokeDetail.style.display = 'none';
    }
});


pokemonList.addEventListener('click', async (event) => {
    const clickPokemon = event.target.closest('.pokemon');
    if (clickPokemon) {
        const pokemonId = parseInt(clickPokemon.getAttribute('data-pokemon-id'));

        try {
            const pokemonDetails = await pokeApi.getPokemonDetailById(pokemonId); 
            showPokemonDetails(pokemonDetails);
        } catch (error) {
            console.error("Erro ao obter detalhes do Pokémon:", error);
        }
    }
});