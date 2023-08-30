const modal = document.querySelector(".modal");

//Spinner
const spinner = document.createElement("div");
spinner.innerHTML = `<div id="circularG">
	<div id="circularG_1" class="circularG"></div>
	<div id="circularG_2" class="circularG"></div>
	<div id="circularG_3" class="circularG"></div>
	<div id="circularG_4" class="circularG"></div>
	<div id="circularG_5" class="circularG"></div>
	<div id="circularG_6" class="circularG"></div>
	<div id="circularG_7" class="circularG"></div>
	<div id="circularG_8" class="circularG"></div>
</div>`;

//Eventos para geração do pokecard
["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, async function (e) {
    const id = window.location.hash.slice(1);

    if (!id) return;
    showPokemonInfo(id);
  })
);

window.addEventListener("click", async function (e) {
  pokemonTarget = e.target.closest(".pokemon");
  let numberPoke;

  if (!pokemonTarget) return;

  if (pokemonTarget) {
    numberPoke = pokemonTarget.querySelector(".number").textContent;
    window.location = numberPoke;

    showPokemonInfo(numberPoke.slice(1));
  }
});

//Mostra todas as informações detalhadas do Pokemon dentro da Model
async function showPokemonInfo(id) {
  //removendo messagem de error
  const errorMsg = document.querySelector(".error-message");
  if (errorMsg) errorMsg.remove();

  let data;

  //Colocando na DOM a modal e adicionando o loader
  modal.classList.remove("hidden");
  modal.innerHTML = "";
  modal.innerHTML = spinner.innerHTML;

  // 1 - Pega os dados do Pokemon detalhado
  data = await getPokemonInfo(id);

  if (!data) return;

  // 2 - Usa um markup do card do pokemon e modificar de acordo com os dados
  const url = `<div class="pokecard flex-column">
          <div class="pokecard__header ${
            data.types.at(0).type.name
          } flex-column">
            <div class="pokecard__header--heading">
              <img class="arrow-btn" src="./assets/css/less-than-solid.svg" alt="" />
              <span>Nª ${data.order}</span>
            </div>
            <div class="pokecard__header--img">
              <img
                src=${data.mainPicture}              
                alt=""
              />
            </div>
          </div>
          <div class="pokecard__breeding">
            <div class="pokecard__breeding--heading flex-column">
              <h1>${data.name}</h1>
              <div>
              ${data.types
                .map(
                  (objType) =>
                    `<span class=${objType.type.name}>
                  ${objType.type.name}</span>`
                )
                .join("")}
              </div>
            </div>
            <div class="pokecard__breeding--content flex-column">
              <div class="breeding">
                <div class="block-info">
                  <h2>${data.order}</h2>
                  <span class="subtitle">National Nª</span>
                </div>
                <div class="block-info">
                  <h2>${data.height} <span>M</span></h2>
                  <span class="subtitle">Height</span>
                </div>
                <div class="block-info">
                  <h2>${data.weight} <span>KG</span></h2>
                  <span class="subtitle">Weight</span>
                </div>
              </div>
              <div class="evolution">
                  ${data.evolutionPoke
                    .map((poke, i) => {
                      if (i !== data.evolutionPoke.length - 1) {
                        return `<div class="evolution__poke flex-column">
                  <img
                    class="evoPoke"
                    src=${poke.image}
                    alt=""
                  />
                  <span class="subtitle">${poke.name}</span>
                </div>
                <div class="evolution__level flex-column">
                  <img
                    class="evoArrow"
                    src="./assets/css/arrow-right-solid.svg"
                    alt=""
                  />
                  <span class="subtitle">LVL ${
                    data.evolutionPoke[i + 1].min_level || "Unknown"
                  }
                </span>
                </div>`;
                      } else {
                        return `<div class="evolution__poke flex-column">
                  <img
                    class="evoPoke"
                    src=${poke.image}
                    alt=""
                  />
                  <span class="subtitle">${poke.name}</span>
                </div>`;
                      }
                    })
                    .join("")}
                </div>
            </div>
          </div>
        </div>`;

  // 3 - Retirando a classe hidden da model

  // 4 - Renderiza esse markup dentro da aplicação
  modal.innerHTML = url;
  const closeBtn = document.querySelector(".arrow-btn");
  closeBtn.addEventListener("click", function (e) {
    modal.classList.add("hidden");
    modal.innerHTML = "";
  });
}

//Pega todas as informações do Pokemon
async function getPokemonInfo(id) {
  let pokeObj = {};

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) throw new Error("Não pode fazer o fetch, tente de novo");

    const data = await res.json();

    pokeObj = {
      name: data.name,
      weight: data.weight / 10,
      height: data.height / 10,
      types: Array.from(data.types), //array,
      order: String(data.order).padStart(3, 0),
      mainPicture: data.sprites.other.dream_world.front_default,
    };

    //Pegando a evolução do Pokemon
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    //fetching a cadeia de evolucoes

    const fetchChain = await fetch(speciesData.evolution_chain.url);
    let { chain } = await fetchChain.json();

    let evoChain = [];

    do {
      let evoDetails = chain["evolution_details"][0];

      evoChain.push({
        species_name: chain.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
      });

      chain = chain["evolves_to"][0];
    } while (!!chain && chain.hasOwnProperty("evolves_to"));

    const arrayPokeEvo = evoChain.map((poke) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${poke.species_name}`)
    );

    const arrayFetchPokeEvo = await Promise.all(arrayPokeEvo);
    const evoFetchPokes = await Promise.all(
      arrayFetchPokeEvo.map((data) => data.json())
    );

    const evolutionChain = getEvolutionChainInfo(evoChain, evoFetchPokes);

    pokeObj = {
      ...pokeObj,
      evolutionPoke: evolutionChain,
    };

    return pokeObj;
  } catch (err) {
    //Error Component
    const errorMessage = document.createElement("div");

    errorMessage.innerHTML = `<div class="error-message">
      <p>${err.message}</p>
      <img class="btn-error" src="./assets/css/close-message.svg" alt="" />
    </div>`;
    window.document.body.insertAdjacentElement("afterbegin", errorMessage);
    modal.classList.add("hidden");

    const btnError = document.querySelector(".btn-error");
    btnError.addEventListener("click", function (e) {
      errorMessage.remove();
    });
  }
}

//Uma function utility para pegar a cadeia evolutiva do Pokemon - é usada dentro do getPokemonInfo -
function getEvolutionChainInfo(chainData, imageChain) {
  let finalEvo = [];

  chainData.map((poke) => {
    x = {
      name: poke.species_name,
      min_level: poke.min_level,
    };
    let image = imageChain.find((chain) => chain.name == x.name);
    x = { ...x, image: image.sprites.front_default };

    finalEvo.push(x);
  });

  return finalEvo;
}
