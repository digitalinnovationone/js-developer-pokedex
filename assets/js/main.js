
let cores = {
  normal: '#bbb9ac',
  grass: '#8cd852',
  fire: '#fb5643',
  water: '#57adff',
  fighting: '#a95742',
  flying: '#76a0ff',
  poison: '#a95ca2',
  ground: '#eaca55',
  rock: '#cdbb73',
  bug: '#c2d11f',
  ghost: '#7773d2',
  electric: '#fde138',
  psychic: '#fa64b5',
  ice: '#95f1ff',
  dragon: '#8a75fe',
  dark: '#8d6855',
  steel: '#c4c2d8',
  fairy: '#fbaeff'
}

const pokemonId = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const img = document.getElementsByClassName('img')[0]
let pokemon = document.getElementsByClassName('pokemon')
let keepLookingPokemon = [];
let keepNumberPokemon = -1;
let keepBackground
const maxRecord = 151
const limit = 10
let offset = 0
const limitDetail = 1


function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map((pokemon) =>
      `
      <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}" class="img">
        </div>
      </li>
    `
    ).join('')
    pokemonId.innerHTML += newHTML
    seePokemon()
    unseePokemon()
  })
}
loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtRecordNextPage = offset + limit
  if (qtRecordNextPage >= maxRecord) {
    const newLimit = maxRecord - offset
    loadPokemonItems(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})

function addDetails(newDetail) {
  let offsetDetail = newDetail.querySelector('.number').textContent - 1
  function loadPokemonDetails(offsetDetail, limitDetail) {
    pokeApi.getPokemon(offsetDetail, limitDetail).then((pokemons = []) => {
      const newCard = pokemons.map((pokemon) =>
        `
      <div class="pokeDetails">
        <section>
          <span>Sobre</span>
          <span>Detalhes</span>
          <span>outros</span>
        </section>
        <section>
          <table>
            <tbody>
              <tr><td>Species</td><td>...</td></tr>
              <tr><td>Height</td><td>${pokemon.height * 5}cm</td></tr>
              <tr><td>Weight</td><td>${pokemon.weight / 10}kg</td></tr>
              <tr><td>Abilities</td> ${pokemon.abilities.map((ability) => `<td>${ability.ability.name}</td>`).join('')}</tr>
              <tr><td></td><td></td></tr>
            </tbody>
          </table>
        </section>
      </div>
      
      `).join('')
      newDetail.innerHTML += newCard
    })
  }
  loadPokemonDetails(offsetDetail, limitDetail)
}

function removeDetails() {
  const pokeDetails = document.getElementsByClassName('pokeDetails')[0]
  pokeDetails.parentElement.removeChild(pokeDetails)
}

function seePokemon() {
  let getPokemon = document.querySelectorAll('.pokemon')
  getPokemon.forEach(function (pokemon) {
    pokemon.addEventListener('click', (e) => {
      let pokemonTarget = e.currentTarget
      keepLookingPokemon.push(pokemonTarget)
      keepNumberPokemon++
      keepBackground = pokemonTarget.querySelector('li:first-child').textContent
      addClasses(pokemonTarget)
      addDetails(pokemonTarget)
      addHover(pokemonTarget)
      pokemonTarget.style.background = `-webkit-linear-gradient(top right, #ffffff 0%, ${cores[keepBackground]} 100%)`
    })
  })
}

function unseePokemon() {
  let getOffPokemon = document.querySelector('h1')

  getOffPokemon.addEventListener('click', function () {
    removeClasses(keepLookingPokemon[keepNumberPokemon])
    removeHover(keepLookingPokemon[keepNumberPokemon])
    removeDetails(keepLookingPokemon[keepNumberPokemon])
    keepLookingPokemon[keepNumberPokemon].style.removeProperty('background')
    keepLookingPokemon.pop()
    keepNumberPokemon--
  })
  
}

function addClasses(pokemon) {
  let name = pokemon.querySelector('.name')
  let detail = pokemon.querySelector('.detail')
  let types = pokemon.querySelector('.types')
  let type = pokemon.querySelectorAll('.type')
  let img = pokemon.querySelector('.img')

  pokemon.classList.add('pokemonAux')
  name.classList.add('nameAux')
  detail.classList.add('detailAux')
  types.classList.add('typesAux')
  type[0].classList.add('typeAux')
  if (type[1]) { type[1].classList.add('typeAux') }
  img.classList.add('imgAux')

  pokemon.classList.remove('pokemon')
  name.classList.remove('name')
  detail.classList.remove('detail')
  types.classList.remove('types')
  type[0].classList.remove('type')
  if (type[1]) { type[0].classList.remove('type') }
  img.classList.add('img')

  let pokemons = document.querySelectorAll('.pokemon')
  for (let i = 0; i <= pokemons.length - 1; i++) {
    pokemons[i].style.pointerEvents = 'none'
  }

  pokemon.style.background = `"-webkit-linear-gradient(bottom left, #ffffff 0%, #ffffff 100%)"`
}

function removeClasses(pokemon) {
  let name = pokemon.querySelector('.nameAux')
  let detail = pokemon.querySelector('.detailAux')
  let types = pokemon.querySelector('.typesAux')
  let type = pokemon.querySelectorAll('.typeAux')
  let img = pokemon.querySelector('.imgAux')


  pokemon.classList.add('pokemon')
  name.classList.add('name')
  detail.classList.add('detail')
  types.classList.add('types')
  type[0].classList.add('type')
  if (type[1]) { type[1].classList.add('type') }
  img.classList.add('img')

  pokemon.classList.remove('pokemonAux')
  name.classList.remove('nameAux')
  detail.classList.remove('detailAux')
  types.classList.remove('typesAux')
  type[0].classList.remove('typeAux')
  if (type[1]) { type[1].classList.remove('typeAux') }
  img.classList.remove('imgAux')

  let pokemons = document.querySelectorAll('.pokemon')
  for (let i = 0; i <= pokemons.length - 1; i++) {
    pokemons[i].style.pointerEvents = 'auto'
  }

}

function addHover(pokemon) {
  let detailNames = pokemon.querySelectorAll('.pokeDetails span')
  for (let i = 0; i <= detailNames.length - 1; i++) {
    detailNames[i].classList.add('hoverDetail')
  }
}

function removeHover(pokemon) {
  let detailNames = pokemon.querySelectorAll('.podeDetails span')
  for (let i = 0; i <= detailNames.length - 1; i++) {
    detailNames[i].classList.remove('hoverDetail')
  }
}