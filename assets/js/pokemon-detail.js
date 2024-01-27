const pokemonDetail = document.getElementById('pokemon-detail');

async function obterDetalhesPokemon(numeroPokemon) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro ao obter detalhes do Pokémon: ${response.status}`);
    }

    const pokemonData = await response.json();
    return [pokemonData];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function loadPokemonModal(pokemonData) {
  try {
    const newHtml = pokemonData.map((pokemon) => `
        <div class="pokemon ${pokemon.types[0].type.name}">
          <span class="number">#${pokemon.id}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
          </div>
        </div>        

        <div class="pokemon-details">
          <!-- Títulos das abas em uma linha fixa -->
          <div class="tab-row">
            <div class="tab" onclick="mostrarConteudo('sobre')">Sobre</div>
            <div class="tab" onclick="mostrarConteudo('base-status')">Base Status</div>
          </div>

          <!-- Conteúdo das abas em colunas abaixo dos títulos -->
          <div id="sobre" class="tab-content">
            <div class="content">
              <div class="row">
                <div class="col-3">Especie</div>
                <div class="col-9">${pokemon.species.name}</div>
              </div>
              <div class="row">
                <div class="col-3">Altura</div>
                <div class="col-9">${pokemon.height}</div>
              </div>
              <div class="row">
                <div class="col-3">Peso</div>
                <div class="col-9">${pokemon.weight}</div>
              </div>
              <div class="row">
                <div class="col-3">Habilidades</div>
                <div class="col-9">${pokemon.abilities.map((abilityObject) => abilityObject.ability.name).join(',')}</div>
              </div>
            </div>
          </div>

          <div id="base-status" class="tab-content">
            <div class="content">
              <div class="pokemon-stats">
                ${pokemon.stats.map((stat) => `
                  <div class="row mb-2" key="${stat.stat.name}">
                    <div class="col-4">${stat.stat.name}</div>
                    <div class="col-8">
                      <div class="progress">
                        <div class="progress-bar bg-${getColorForStat(stat.stat.name)}" role="progressbar" style="width: ${stat.base_stat}%" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="100">
                          ${stat.base_stat}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
    `).join('');

    pokemonDetail.innerHTML = newHtml;

    // Retorna uma Promise resolvida
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    // Retorna uma Promise rejeitada em caso de erro
    return Promise.reject(error);
  }
}

document.addEventListener('click', async function (event) {
  if (event.target.matches('[id^="pokemon"]')) {
    const numeroPokemon = event.target.id.match(/\d+/);

    if (numeroPokemon) {
      titleModal.textContent = "Detalhes do Pokemon #" + numeroPokemon;

      try {
        const pokemonData = await obterDetalhesPokemon(numeroPokemon);
        await loadPokemonModal(pokemonData);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
