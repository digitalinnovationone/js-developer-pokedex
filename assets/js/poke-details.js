const pokeInfo = document.getElementById("card");

function convertPokemonToCard(pokemon) {
  return `
  <article>
    <div class="card_first_div ${pokemon.type}">
      <header>
        <p>#${pokemon.number}</p>
      </header>
      <div>
        <img src="${pokemon.photoShiny}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
      </div>
      <div class="card_detail">
        <ol class="pokemon_info_types">${pokemon.types
          .map((type) => `<li class="pokemon_type ${type}">${type}</li>`)
          .join("")}
        </ol>
      </div>
    </div>
    <div class="card_second_div">
      <h3>Informações</h3>
      <h5>Habilidades:</h5>
      <ul class="pokemon_info_abilities">${pokemon.abilities
        .map((ability) => `<li class="ability">${ability}</li>`)
        .join("")}
      </ul>
      <div>
        <p><span class="info">Altura:</span> ${pokemon.height}m</p>
        <p><span class="info">Peso:</span> ${pokemon.weight}kg</p>
      </div>
    </div>
  </article>`;
}

function pokemonId() {
  const getUrl = window.location.href;
  const paramUrl = new URL(getUrl);
  const id = paramUrl.searchParams.get("id");
  return id;
}

function loadPokemon(id) {
  pokeApi.convertPokemonToDetail(id).then((pokemon) => {
    const newPokemon = convertPokemonToCard(pokemon);
    pokeInfo.innerHTML += newPokemon;
    
  });
}

loadPokemon(pokemonId());