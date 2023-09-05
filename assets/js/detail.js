
    function convertPokemonToLi(pokemon) {
        return `
        <a href="detail.html?id=${pokemon.number}" target="_self"><div>
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                <li>Type</li>
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <p>Stats</p>
        <div class="detail">
            <ol class="abilities">
                ${pokemon.stats.map((base_stat) => `<li class="ability ${base_stat}">${base_stat}</li>`).join('')}
            </ol>
        </div>
    </li>
    </div>
    </a>
     `
    }


    document.addEventListener('DOMContentLoaded', function() {
        const pokemonDetailList = document.getElementById('pokemon');
    
        function loadPokemonDetail() {
            const queryParams = new URLSearchParams(window.location.search);
            const pokemonNumber = queryParams.get('id');
    
            pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/` })
                .then((pokemon) => {
                    console.log("Detalhes do Pokémon:", pokemon);
                    const html = convertPokemonToLi(pokemon);
                    pokemonDetailList.innerHTML += html;
                })
        }
    
        loadPokemonDetail();
    });
    


