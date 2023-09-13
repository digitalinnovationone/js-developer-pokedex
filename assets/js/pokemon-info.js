const pokeInfo = document.getElementsByClassName("content");

function convertPokeApiInfoToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  if (pokeDetail.abilities) {
    const abilities = pokeDetail.abilities.map(
      (abilitySlot) => abilitySlot.ability.name
    );
    const [ability] = abilities;

    pokemon.abilities = abilities;
    pokemon.ability = ability;
  }

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

function convertPokemonToCard(pokemon) {
  console.log(pokemon);
  return `<header>
      <p class="back_home">Fechar</p>
      <p>Número</p>
    </header>
    <section>
      <article>
      <img src="${pokemon.photo}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <div class="detail">
        <ol class="pokemon_info_types">${pokemon.types
          .map((type) => `<li class="pokemon_type ${type}">${type}</li>`)
          .join("")}
        </ol>
        </div>
      </article>
    <div class="pokemon_div">
      <h5>Habilidades:</h5>
      <ol class="pokemon_info_abilities">${pokemon.abilities
        .map((ability) => `<li class="pokemon_type ${ability}">${ability}</li>`)
        .join("")}
      </ol>
    </div>
    <p>${pokemon.height}in</p>
    <p>${pokemon.weight}lb</p>`;
}

function getId() {
  const getUrl = window.location.href;
  const paramUrl = new URL(getUrl);
  const id = paramUrl.searchParams.get("id");
  return id;
}

function loadPokemon() {
  pokeApi.pokemonCard(getId()).then((pokemon) => {
    const infoPokemon = convertPokemonToCard(pokemon);
    console.log(infoPokemon);
    pokeInfo += infoPokemon;
  });
}

loadPokemon();
