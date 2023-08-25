document.addEventListener('DOMContentLoaded', () => {
    const pokemonAbout = document.getElementById("pokemonAbout");
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('name');

    getPokemonDetails(pokemonName).then((pokemon) => {
        pokemonAbout.innerHTML = `
        <div class="pokmon-details ${pokemon.type}">
            <div class="title">
            <img class="arrow-back" src="img/arrow-back.svg" onclick="window.location.href = 'index.html'"/>
            <div class="text-wrapper">${pokemon.name}</div>
            <div class="div">#${pokemon.number}</div>
            </div>
            <div class="image">
            <div class="silhouette"><img class="image" src="${pokemon.aboutImg}" alt="${pokemon.name}"></div>
            </div>
            <div class="card">
            <div class="type">
                ${pokemon.types.map(type => `<div class="type-chips ${pokemon.type}"><div class="text-wrapper-2">${type}</div></div>`).join('')}
            </div>
            <div class="text-wrapper-3">About</div>
            <div class="attribute">
                <div class="frame">
                <div class="frame-2">
                    <img class="img-2" src="img/weight.svg" />
                    <div class="text-wrapper-4">${pokemon.weight/10} kg</div>
                </div>
                <div class="text-wrapper-5">Weight</div>
                </div>
                <div class="divider"></div>
                <div class="frame">
                <div class="frame-2">
                    <img class="img-2" src="img/straighten.svg" />
                    <div class="text-wrapper-4">${pokemon.height/10} m</div>
                </div>
                <div class="text-wrapper-5">Height</div>
                </div>
                <div class="divider"></div>
                <div class="frame">
                <div class="ability-ability-wrapper">
                    <div class="ability-ability">${pokemon.abilities.map(ability => `${ability}<br>`).join('')}</div>
                </div>
                <div class="text-wrapper-5">Moves</div>
                </div>
            </div>
            <p class="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis eros vitae tellus condimentum maximus
                sit amet in eros.
            </p>
            <div class="text-wrapper-6">Base Stats</div>
            <div class="base-stats">
                <div class="label">
                
                <div class="text-wrapper-7">HP</div>
                <div class="text-wrapper-8">ATK</div>
                <div class="text-wrapper-8">DEF</div>
                <div class="text-wrapper-8">SATK</div>
                <div class="text-wrapper-8">SDEF</div>
                <div class="text-wrapper-8">SPD</div>


                </div>
                <div class="data">
                <div class="text-wrapper-9">${pokemon.baseStats.map(baseStat => `${baseStat}`).join('\n')}</div>
                </div>
            </div>
            </div>
            <img class="pokeball" src="img/pokeball-1.svg" />
        </div>
        `;
    })
});

// loadPokemonInfo(pokemonName);
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
                number: data.id,
                ability: data.abilities[0].ability.name,
                abilities: data.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name),
                weight: data.weight,
                height: data.height,
                type: data.types[0].type.name,
                types: data.types.map((typeSlot) => typeSlot.type.name),
                aboutImg: data.sprites.other.home.front_default,
                baseStats: data.stats.map((baseStatSlot) => baseStatSlot.base_stat),
                stat: data.stats[0].stat.name,
                stats: data.stats.map((baseStatSlot) => baseStatSlot.stat.name),
            };
            return pokemonDetails;
        });
};

