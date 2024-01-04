const voltar = document.getElementById("voltar");
const content = document.getElementById("content");
const subtitle = document.getElementById("header__subtitle");
const icon = document.getElementById("icon");
const pokemonName = document.getElementById("name");
const types = document.getElementById("types");
const weightEl = document.getElementById("weight-kg");
const heightEl = document.getElementById("height-m");
const abilities = document.getElementById("ability_kit");
const arrowLeft = document.getElementById("arrow_left");
const arrowRight = document.getElementById("arrow_right");
const pokemons = JSON.parse(localStorage.getItem("pokemons"));
var progressBars = document.querySelectorAll("progress[value]");

const hp = document.getElementById("hp");
const atk = document.getElementById("attack");
const def = document.getElementById("defense");
const satk = document.getElementById("special-attack");
const sdef = document.getElementById("special-defense");
const spd = document.getElementById("speed");

const hpProgress = document.getElementById("progress-hp");
const atkProgress = document.getElementById("progress-attack");
const defProgress = document.getElementById("progress-defense");
const satkProgress = document.getElementById("progress-special-attack");
const sdefProgress = document.getElementById("progress-special-defense");
const spdProgress = document.getElementById("progress-speed");

const statsIds = [hp, atk, def, satk, sdef, spd];
const progressIds = [
  hpProgress,
  atkProgress,
  defProgress,
  satkProgress,
  sdefProgress,
  spdProgress,
];
const statsIdsMap = statsIds.map((stat) => stat.id);
const progressIdsMap = progressIds.map((progress) => progress.id);

// Obtenha a string de consulta da URL
// Extraia o objeto codificado da string de consulta
let meuObjetoCodificado = localStorage.getItem("selectedPokemon");
// Decodifique a string JSON
let meuObjetoJSON = decodeURIComponent(meuObjetoCodificado);
// Converta a string JSON de volta em um objeto
let meuObjeto = JSON.parse(meuObjetoJSON);

console.log(meuObjeto);

function draw() {
  document.body.className = meuObjeto.type;
  content.classList.add(meuObjeto.type);
  let progressClass = `progress-${meuObjeto.type}`;

  progressBars.forEach((progressBar) => {
    progressBar.classList.add(progressClass);
  });

  if (meuObjeto.type !== content.classList[1]) {
    content.classList.replace(content.classList[1], meuObjeto.type);
  }

  progressBars.forEach((progressBar) => {
    var oldClass = progressBar.classList[0];
    var newClass = `progress-${meuObjeto.type}`;
    if (oldClass !== newClass) {
      // Remove a classe antiga
      progressBar.classList.remove(oldClass);

      // Adiciona a nova classe
      progressBar.classList.add(newClass);
    }
  });

  subtitle.innerHTML = `#${meuObjeto.number}`;

  icon.src = meuObjeto.icon;
  pokemonName.innerHTML = meuObjeto.name;

  statsIdsMap.forEach((id) => {
    var index = meuObjeto.stats.findIndex((item) => item.stat.name === id);
    // console.log(index);
    statsIds[index].innerHTML = meuObjeto.stats[index].base_stat;
  });

  progressIdsMap.forEach((id) => {
    var index = meuObjeto.stats.findIndex(
      (item) => `progress-${item.stat.name}` === id
    );
    progressIds[index].value = meuObjeto.stats[index].base_stat;
  });

  function convertToSpan(className, type) {
    return `
    <span class="${className} ${type}">
        ${type}
    </span>
    `;
  }

  meuObjeto.abilities.map((ability) => {
    const newHtml = convertToSpan("ability-item", ability.ability.name);
    abilities.innerHTML += newHtml;
  });

  meuObjeto.types.map((type) => {
    const newHtml = convertToSpan("type", type);
    types.innerHTML += newHtml;
  });

  heightEl.innerHTML = `${meuObjeto.height} m`;
  weightEl.innerHTML = `${meuObjeto.weight} kg`;
}

draw();

voltar.addEventListener("click", () => {
  window.location.href = "/";
});

// arrowLeft.addEventListener('click', () => {
//     let index = meuObjeto.number;
//     const previousPokemon = Pokemons[index - 1];
// })

arrowRight.addEventListener("click", () => {
  let index = meuObjeto.number;
  const nextPokemon = index + 1;
  const selectedPokemon = pokemons.find(
    (pokemon) => pokemon.number === nextPokemon
  );

  if (selectedPokemon) {
    // reset

    types.innerHTML = "";
    weightEl.innerHTML = "";
    heightEl.innerHTML = "";
    abilities.innerHTML = "";
    meuObjeto = selectedPokemon;
    draw();
  } else {
    throw new Error(
      `Nenhum pokemon com o número ${nextPokemon} foi encontrado.`
    );
  }
});

arrowLeft.addEventListener("click", () => {
  let index = meuObjeto.number;
  const nextPokemon = index - 1;
  const selectedPokemon = pokemons.find(
    (pokemon) => pokemon.number === nextPokemon
  );

  if (selectedPokemon) {
    // reset

    types.innerHTML = "";
    weightEl.innerHTML = "";
    heightEl.innerHTML = "";
    abilities.innerHTML = "";

    meuObjeto = selectedPokemon;
    draw();
  } else {
    throw new Error(
      `Nenhum pokemon com o número ${nextPokemon} foi encontrado.`
    );
  }
});
