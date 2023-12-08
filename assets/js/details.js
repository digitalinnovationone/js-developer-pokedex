const detailsContainer = document.getElementById('pokeDetails');

const params = new URLSearchParams(window.location.search);
const idOrName = params.get('pokemon');

window.onload = () => {
    loadPokemon(idOrName);
}

function loadPokemon(idOrName) {
    pokeApi.getPokemonByIdOrName(idOrName).then((pokemon) => {
        document.title = `Detalhes - ${capitalizeFirstLetter(pokemon.name)}`;
        const pokeInfo = createDetailsContainer(pokemon);
        detailsContainer.appendChild(pokeInfo);
    })
}
