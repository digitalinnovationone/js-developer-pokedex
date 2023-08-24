document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('name');

    getPokemonDetails(pokemonName).then((pokemon) => {
        const pokemonHTML = `
            <div class="card ${pokemon.type}"> 
                <header class="header">
                    <aside class="name-type"> 
                        <h2 class="name">${pokemon.name}</h2>

                        <ol class="types">
                            ${pokemon.types.map(type => `<li>${type}</li>`).join('')}
                        </ol>
                    </aside> 
                    <p class="number">#${pokemon.pokemonNumber}</p>

                </header>
            
                <section class="content">  
                   
                    <h4>Abilities</h4> 
                    <div class="abilities">
                        <p>${pokemon.abilities.map(ability => `<li>${ability}</li>`).join('')}
                    </div>

                    <h4>Base Stats</h4>
                    <ol class="stats">
                        <div class="list-stats"> 
                            ${pokemon.stats.map(stat => `<li>${stat}</li>`).join('')}
                        </div>

                        <div class="list-stats">
                            ${pokemon.baseStats.map(baseStat => `<li>${baseStat}</li>`).join('')}
                        </div>
                    </ol>

                    <img class="image" src="${pokemon.photo}" alt="${pokemon.name}">
                </section> 
            </div>
            `;

        //Insere as informações do Pokémon na div de detalhes
        pokemonDetails.innerHTML = pokemonHTML;
    });
});

// Função para obter os detalhes do Pokémon da API PokeAPI
function getPokemonDetails(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    // Solicitação para a API PokeAPI
    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Não foi possível obter os detalhes do Pokémon.');
            }

            return response.json();
        })
        .then((data) => {
            const pokemonDetails = {
                name: data.name,
                pokemonNumber: data.id,
                ability: data.abilities[0].ability.name,
                abilities: data.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name),
                weight: data.weight,
                height: data.height,
                type: data.types[0].type.name,
                types: data.types.map((typeSlot) => typeSlot.type.name),
                photo: data.sprites.other.dream_world.front_default,
                baseStats: data.stats.map((baseStatSlot) => baseStatSlot.base_stat),
                stat: data.stats[0].stat.name,
                stats: data.stats.map((baseStatSlot) => baseStatSlot.stat.name),
            };
            return pokemonDetails;
        });
}
