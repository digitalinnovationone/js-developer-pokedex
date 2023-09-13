const pokemonsList = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modalInser = document.getElementById("modalInser");
const maxRecord = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => {
        return `
       
  <li data-pokemon='${JSON.stringify(
    pokemon
  )}' onclick="openModal(this)"class="pokemon ${pokemon.type} buttonDetails" >
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
  
          <div class="detail">
            <ol class="types ">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>
           
            <img  src="${pokemon.photo}"
              alt="${pokemon.name}"/>
          </div>
        </li>
        
      `;
      })
      .join("");
    pokemonsList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  let qtRecordWithNexPage = offset + limit;

  if (qtRecordWithNexPage >= maxRecord) {
    const newLimit = maxRecord - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
function openModal(element) {
  const pokemonJSON = element.getAttribute("data-pokemon");
  const pokemon = JSON.parse(pokemonJSON);
  console.log("openModal called");
  const modalContent = `
  <div class="modalDetais ${pokemon.type}">
  <div class="modalTitle">
    <span class="modalNumber ${pokemon.type}">#${pokemon.number}</span>
    <span class="modalName">${pokemon.name}</span>
    <button onclick="closeModal()" class="buttonX">X</button>
  </div>
  <div class="modalPhotoCard">
    <img
      class="modalPhoto"
      src="${pokemon.photo}"
      alt="pokemon"
    />
    <ol class="modalTypes">
    ${pokemon.types
      .map((type) => `<li class=" modalType ${type}">${type}</li>`)
      .join("")}
    </ol>
  </div>
</div>

  `;

  // Set the modal content
  modalInser.innerHTML = modalContent;

  // Show the modal
  modalInser.style.display = "flex";
}

function closeModal() {
  modalInser.style.display = "none";
}
