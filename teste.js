// Array de nomes de Pokémon
const pokemonList = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon","charizand","squirtle","wartortle","blastoise","metapod",
"butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","ratatta","raticate",""];

// Função para obter detalhes do Pokémon por nome
async function getPokemonDetails(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Função para preencher os detalhes de um Pokémon na lista
async function fillPokemonDetails(pokemonName) {
    try {
        const pokemonData = await getPokemonDetails(pokemonName);

        const pokemonDetailsDiv = document.getElementById("pokemonDetails");
        pokemonDetailsDiv.innerHTML = `
            <h2>Nome: ${pokemonData.name}</h2>
            <p>Número: ${pokemonData.id}</p>
            <p>Tipo(s): ${pokemonData.types.map(type => type.type.name).join(", ")}</p>
            <p>Altura: ${pokemonData.height}</p>
            <p>Peso: ${pokemonData.weight}</p>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <h3>Descrição</h3>
            <p>${await getPokemonDescription(pokemonData.species.url)}</p>
        `;
    } catch (error) {
        console.error('Erro ao preencher detalhes do Pokémon:', error);
    }
}

// Função para obter a descrição do Pokémon da API
async function getPokemonDescription(speciesUrl) {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
    return description;
}

// Adicione um evento de clique aos elementos da lista
document.addEventListener("DOMContentLoaded", () => {
    const listContainer = document.getElementById("pokemonList");

    pokemonList.forEach(pokemonName => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemonName;

        listItem.addEventListener("click", () => {
            fillPokemonDetails(pokemonName);
        });

        listContainer.appendChild(listItem);
    });
});
