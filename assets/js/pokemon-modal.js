const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

async function createModal(pokemonDetail) {
  const modalContent = document.getElementsByClassName('modal-content');
  modalContent[0].classList.add(`${pokemonDetail.type}`);
  modal.style.display = "block";

  const content = document.createElement('div');
  content.classList.add('stats-content');
  content.innerHTML = `
    <h1 id="pokemonName">${pokemonDetail.name}</h1>
    <img src=${pokemonDetail.alternativePhoto} alt=${pokemonDetail.name}>
    <h2>About</h2>
    <div class="pokemon-stats">
      <div class="stats">
        <span>HP</span>
        <span>${pokemonDetail.stats[0].base_stat}</span>
      </div>
      <div class="stats">
        <span>Attack</span>
        <span>${pokemonDetail.stats[1].base_stat}</span>
      </div>
      <div class="stats">
        <span>Defense</span>
        <span>${pokemonDetail.stats[2].base_stat}</span>
      </div>
      <div class="stats">
        <span>Speed</span>
        <span>${pokemonDetail.stats[5].base_stat}</span>
      </div>
    </div>
  `
  modalContent[0].appendChild(content);
  
  span.onclick = function() {
    modal.style.display = "none";
    modalContent[0].removeChild(content)
    modalContent[0].classList.remove(`${pokemonDetail.type}`);
  }  
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalContent[0].removeChild(content)
      modalContent[0].classList.remove(`${pokemonDetail.type}`);
    }
  }
}

// Adiciona um manipulador de evento de clique a cada botão Pokémon
function addPokemonButtonClickHandler(pokemonButton) {
  pokemonButton.addEventListener('click', async () => {
      const pokemonName = pokemonButton.querySelector('.name').innerHTML;
      try {
          const pokemonDetail = await pokeApi.getPokemonDetail({
              url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          });
          if (pokemonDetail) {
              await createModal(pokemonDetail);
          }
      } catch (error) {
          console.error('Error loading Pokemon detail:', error);
      }
  });
}
