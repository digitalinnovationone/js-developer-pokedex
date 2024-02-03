const detailsOverlay = document.getElementById('detailsOverlay');
const closeDetailsButton = document.getElementById('closeDetailsButton');
const detailsContent = document.querySelector('.details-content');

function showPokemonDetails(pokemon) {
    detailsContent.innerHTML = `
        <h1>Detalhes do Pokémon</h1>
        <p><strong>Espécie:</strong> ${pokemon.species}</p>
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.join(', ')}</p>
        <p><strong>HP:</strong> ${pokemon.hp}</p>
        <p><strong>Ataque:</strong> ${pokemon.attack}</p>
        <p><strong>Defesa:</strong> ${pokemon.defense}</p>
        <p><strong>Velocidade:</strong> ${pokemon.speed}</p>
        <p><strong>Total:</strong> ${pokemon.total}</p>
    `;
    detailsOverlay.style.display = 'flex';
}

detailsOverlay.addEventListener('click', (event) => {
    if (event.target === detailsOverlay) {
        detailsOverlay.style.display = 'none';
    }
});

pokemonList.addEventListener('click', async (event) => {
    const detailsButton = event.target.closest('.details-button');
    if (detailsButton) {
        const pokemonId = parseInt(detailsButton.getAttribute('data-pokemon-id'));

        try {
            const pokemonDetails = await pokeApi.getPokemonDetailById(pokemonId); 
            showPokemonDetails(pokemonDetails);
        } catch (error) {
            console.error("Erro ao obter detalhes do Pokémon:", error);
        }
    }
});