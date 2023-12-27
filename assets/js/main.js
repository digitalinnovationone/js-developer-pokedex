const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

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
                    ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button class="details_button" type="button" onclick="searchPokemonDetails(${
                pokemon.id
            })">Details</button>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

function searchPokemonDetails(id) {
    pokeApi.getPokemonInfoById(id).then((pokemon_info) => {
        fillPokemonModalInfo(pokemon_info);
    });
}

function fillPokemonModalInfo(pokemon) {
    pokemon.types = pokemon.types.map((typeSlot) => typeSlot.type.name);
    [pokemon.type] = pokemon.types;
    pokemon.photo = pokemon.sprites.other.dream_world.front_default;
    pokemon.stats = pokemon.stats.map((stats) => [
        stats.base_stat,
        stats.stat.name,
    ]);

    const info = `
    <div class="pokemon ${pokemon.type}">
        <div class="detail">
        <ol class="types">
            ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
        </ol>

        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
    </div>
    <div class='pokemon-statistcs'>
        <h2>Statistics</h2>
        <ul class="stats">
            ${pokemon.stats
                .map((stat) => {
                    return `<li class="stat">${stat[1] + " = " + stat[0]}</li>`;
                })
                .sort()
                .join("")}
        </ul>
    </div>
    `;
    $("#pokemon-info").html(info);
    $("#pokemon-detail-name").html(`${pokemon.name}`);
    showPokemonDetailsModal();
}

function showPokemonDetailsModal() {
    $("#pokemon-detail").modal("show");
}
