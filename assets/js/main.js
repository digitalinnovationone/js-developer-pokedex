const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalDetail = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".btn-close");

const maxRecords = 151
const limit = 10
let offset = 0;


const openModal = function () {
    modalDetail.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modalDetail.classList.add("hidden");
    overlay.classList.add("hidden");

};

function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}" onClick="showModal(${pokemon.number})">
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

function convertSigleDataToModal(pokeData) {
    const { id, name, weight, height,
        abilities, attack, defense, speed, image, type, description } = pokeData
    // modalDetail.classList.add(`${type}`);
    return `
        <section class="modal flex ${type}"
        <div>
            <img
            src="${image}"
            alt="${name}"
            />
        </div>
        <div>
            <button class="btn-close" onClick="closeModal()">⨉</button>
            <div class="head-title">
            <h3>${name}</h3>
            <h3 class="id">#${id}</h3>
        </div>
        <p>
          ${description}
        </p>
        <ul>
          <li>Altura: ${height}</li>
          <li>Peso: ${weight}</li>
          <li>Ataque: ${attack}</li>
          <li>Defesa: ${defense}</li>
          <li>Velocidade: ${speed}</li>
          <li>Abilidade: ${abilities.ability.name}</li>
        </ul>
      </div>
      </div>
      </section>
    `
}

async function showModal(pokemonId) {
    const description = await pokeApi.getDescription(pokemonId)
    const modalData = await pokeApi.getSinglePokemon(pokemonId).then(res => convertSigleDataToModal({ ...res, description: description }))
    modalDetail.innerHTML = modalData
    openModal()
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
