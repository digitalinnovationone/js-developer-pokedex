const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img data-src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonData(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Desativa o botão "Load More" quando atingir o número máximo
        if (offset + limit >= maxRecords) {
            loadMoreButton.disabled = true;
        }

        // Adiciona a lógica para carregar imagens conforme o usuário rola a página
        lazyLoadImages();
    });
}

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    lazyImages.forEach((lazyImage) => {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.removeAttribute('data-src');
    });
}

// Carrega os primeiros Pokémon
loadPokemonData(offset, limit);

// Adiciona evento de clique ao botão "Load More"
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonData(offset, limit);
});

// Adiciona eventos de clique aos elementos da lista de Pokémon
pokemonList.addEventListener('click', function (event) {
    // Verifique se o clique ocorreu em um elemento com a classe 'pokemon'
    const pokemonElement = event.target.closest('.pokemon');
    if (pokemonElement) {
        // Obtém o ID do Pokémon com base no ID do elemento clicado
        const pokemonId = pokemonElement.querySelector('.number').textContent.slice(1);

        // Chama a função para exibir os detalhes do Pokémon
        showDetails(pokemonId);
    }
});

function showDetails(pokemonId) {
    // Sua lógica existente para obter detalhes do Pokémon...

    pokeApi.getPokemonDetails(pokemonId).then((pokemonDetails) => {
        // Cria a URL para a nova página com os detalhes do Pokémon
        const detailsUrl = `/details.html?id=${pokemonDetails.id}`;

        // Abre a nova página na guia atual
        window.open(detailsUrl, '_self');
    });
}
// Adiciona um evento de scroll para carregar imagens conforme o usuário rola a página
document.addEventListener('scroll', lazyLoadImages);

