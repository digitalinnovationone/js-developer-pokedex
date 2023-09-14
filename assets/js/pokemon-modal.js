// ---------- Variaveis ----------
const modal = document.getElementById('modal');

// ---------- funcoes ----------

// funcao que converte dados da API para lista
function converterStatusParaLi(pokemon) {
    return `
        <div class="pokemonType ${pokemon.types[0].type.name}"id="pokemonStatus">
            <header>
                <span id="pokemonStatsName">${pokemon.name}</span>
                <span id="pokemonStatsOrder">#${pokemon.order}</span>
            </header>
            <main>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </main>
            <footer>
                <ol>
                    <li>Base Stats</li>
                    <li class="stats">Hp: ${pokemon.stats[0].base_stat}</li>
                    <li class="stats">Attack: ${pokemon.stats[1].base_stat}</li>
                    <li class="stats">Defense: ${pokemon.stats[2].base_stat}</li>
                    <li class="stats">Special Attack: ${pokemon.stats[3].base_stat}</li>
                    <li class="stats">Special Defense: ${pokemon.stats[4].base_stat}</li>
                    <li class="stats">Speed: ${pokemon.stats[5].base_stat}</li>
                    <li><button id="modalButton" type="button" onClick="fecharModal()">Close</button></li>
                </ol>
            </footer>
        </div>
    `
};

// funcao que mostra o modal
function abrirModal(nomeDoPokemon) {
    modal.setAttribute('class', 'enable');
    let url = ('https://pokeapi.co/api/v2/pokemon/' + nomeDoPokemon);
    
    pokeApi.getPokemonModalStats(url).then((pokemon) => {
        let pokemonStatusList = converterStatusParaLi(pokemon);
        modal.innerHTML = pokemonStatusList;
        console.log(pokemon)
    });
};

// funcao que fecha o modal
function fecharModal() {
    modal.setAttribute('class', 'disable');
};