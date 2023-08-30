const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pagination = document.querySelector('.pagination')
const backButton = document.querySelector('#back')
const frame = document.querySelector('#frame')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function calculateStatValue(value) {
    const baseValue = 255
    const calculateValue = (value / baseValue) * 100
    const valueCalculated = Math.round(calculateValue)

    return valueCalculated
}

function calculateWeightOrHeight(value) {
    return value / 10
}

function convertPokemonToCard(pokemon) {
    return `
    <div class="pokemon-card">
    <div class="pokemon-content ${pokemon.type}">
      <div class="pokemon-content-top">
        <div class="info-top">
          <span class="pokemon-name">${pokemon.name}</span>
          <span class="pokemon-id">#${pokemon.number.toString().padStart(3, 0)}</span>
        </div>
        <div class="pokemon-types">
            <div class="pokemon-types_types">
                ${pokemon.types.map((type) => `<span class="types-type ${type}">${type}</span>`).join('')}
            </div>
          </div>
        <div class="pokemon-image">
          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}" />
        </div>
      </div>
      <div class="pokemon-content-bottom">
        <div class="title-about">About</div>
        <div class="info-about">
          <div class="info-about-name">Height</div>
          <div>${calculateWeightOrHeight(pokemon.height)} m</div>
          <div class="info-about-name">Weight</div>
          <div>${calculateWeightOrHeight(pokemon.weight)} kg</div>
          <div class="info-about-name">Abilities</div>
          <div>${pokemon.abilities.join(', ')}</div>
        </div>
        <div class="title-base-stats">Base Stats</div>
        <div class="info-base-stats">
          <div class="stats-name">HP</div>
          <div class="stats-value">${pokemon.stats[0]}</div>
          <div class="outer">
            <div class="inner ${pokemon.type}" style="width: ${calculateStatValue(pokemon.stats[0])}%;"></div>
          </div>
          <div class="stats-name">Attack</div>
          <div class="stats-value">${pokemon.stats[1]}</div>
          <div class="outer">
            <div class="inner ${pokemon.type}" style="width: ${calculateStatValue(pokemon.stats[1])}%;"></div>
          </div>
          <div class="stats-name">Defense</div>
          <div class="stats-value">${pokemon.stats[2]}</div>
          <div class="outer">
            <div class="inner ${pokemon.type}" style="width: ${calculateStatValue(pokemon.stats[2])}%;"></div>
          </div>
          <div class="stats-name">Sp. Atk</div>
          <div class="stats-value">${pokemon.stats[3]}</div>
          <div class="outer">
            <div class="inner ${pokemon.type}" style="width: ${calculateStatValue(pokemon.stats[3])}%;"></div>
          </div>
          <div class="stats-name">Sp. Def</div>
          <div class="stats-value">${pokemon.stats[4]}</div>
          <div class="outer">
            <div class="inner ${pokemon.type}" style="width: ${calculateStatValue(pokemon.stats[4])}%;"></div>
          </div>
          <div class="stats-name">Speed</div>
          <div class="stats-value">${pokemon.stats[5]}</div>
          <div class="outer">
            <div class="inner ${pokemon.type}" style="width: ${calculateStatValue(pokemon.stats[5])}%;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        getPokemonData()
    })
}

function getPokemonData() {
    const allPokemons = document.querySelectorAll('.pokemon')
    allPokemons.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
            frame.innerHTML = ''
            pokemonList.classList.add('hidden')
            pagination.classList.add('hidden')
            backButton.classList.remove('hidden')
            const id = pokemon.querySelector('.number').textContent.replace('#', '')
            const number = Number.parseInt(id) - 1
            pokeApi.getPokemons(number, 1).then((poke = []) => {
                const pokemonCard = poke.map(convertPokemonToCard)
                frame.innerHTML += pokemonCard
                frame.classList.remove('hidden')
            })
        })
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

backButton.addEventListener('click', () => {
    pokemonList.classList.remove('hidden')
    pagination.classList.remove('hidden')
    backButton.classList.add('hidden')
    frame.classList.add('hidden')
})