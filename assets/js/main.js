const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

var titleModal = document.getElementById('title-modal-pokemon-detail');

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="pokemon${pokemon.number}"  data-toggle="modal" data-target="#modalPokemonDetail">
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

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
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

function mostrarConteudo(tabName) {
    var tabs = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
  
    var tabLinks = document.getElementsByClassName("tab");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
  
    document.getElementById(tabName).style.display = "block";
    document.querySelector(`.tab[onclick="mostrarConteudo('${tabName}')"]`).classList.add("active");
  }
  

  document.getElementById('pokemonList').addEventListener('click', async function (event) {
    const clickedPokemon = event.target.closest('[id^="pokemon"]');
  
    if (clickedPokemon) {
      const numeroPokemon = clickedPokemon.id.match(/\d+/);
  
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
  
  
  function getColorForStat(statName) {
    switch (statName) {
      case 'hp':
        return 'success'; // ou qualquer outra classe de cor do Bootstrap
      case 'attack':
        return 'danger';
      case 'defense':
        return 'info';
      case 'special-attack':
        return 'warning';
      case 'special-defense':
        return 'primary';
      case 'speed':
        return 'secondary';
      default:
        return 'dark';
    }
  }
  