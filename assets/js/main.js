const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const maxRecords = 151
const limit = 10;
let offset = 0;

function LoadPokemonItems(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const nextHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                        </ol>
                            <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                        </div>
                </li>
            `).join('')

        pokemonList.innerHTML += nextHtml
    })
}

LoadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        LoadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        LoadPokemonItems(offset, limit);
    }
})


pokemonList.addEventListener('click', async (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    let pokemonNumber = clickedPokemon.querySelector('.number').textContent;
    pokemonNumber = pokemonNumber.replace('#', '');

    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

    try {
        const pokemonDetail = await pokeapi.getPokemonDetail({ url: pokemonURL });
        const { name, number, types, photo } = pokemonDetail;
        const typeList = types.map(type => `<li class="modalType">${type}</li>`).join('');

        // Preencha o modalContent com as informações do Pokémon
        modalContent.innerHTML = `
            <li class="modalPokemon ${types[0]}">
                    <span class="modalNumber">#${number}</span>
                    <span class="modalName">${name}</span>
                    <div class="modalDetail">
                        <ol class="modalTypes">
                            ${typeList}
                        </ol>
                            <img src="${photo}" alt="${name}">
                        </div>
                </li>
            `

        // Exibe janela modal
        modal.style.display = 'flex';
    } catch (error) {
        console.error('Erro ao obter detalhes do Pokémon', error);
    }
});


// Feche a janela modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
