let lastClickedId = null; // Variável para armazenar o último ID clicado

document.querySelectorAll('.load-button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('carousel-control-prev')) {
      if (lastClickedId !== null) {
        // Retrocede para o ID anterior
        lastClickedId--;
      }
    } else if (button.classList.contains('carousel-control-next')) {
      if (lastClickedId !== null) {
        // Avança para o próximo ID
        lastClickedId++;
      }
    }

    loadSinglePokemon(lastClickedId);
  });
});

function loadSinglePokemon(offset) {
  pokeApi.getPokemons(offset, 1).then((pokemons = []) => {
    if (pokemons.length > 0) {
      const newHtml = convertPokemonToLi(pokemons[0], offset);
      const listItem = document.createElement('div');
      listItem.id = `${offset}`;
      listItem.classList.add('carousel-item', 'active', 'dt');
      listItem.innerHTML = newHtml;
      pokemonList.appendChild(listItem);

      lastClickedId = offset; // Atualiza o último ID clicado

    } else {
      // Todos os Pokémon já foram carregados, ocultar o botão "Load More"
      loadMoreButton2.style.display = 'none';
    }
  });
}
