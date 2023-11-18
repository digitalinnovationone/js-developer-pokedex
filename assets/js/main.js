const pokeList = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#loadMoreButton");
const pokeModal = document.querySelector(".modal");
const modalImage = document.querySelector(".modalImage");
const modalTitle = document.querySelector(".modalTitle")
const closeModal = document.querySelector(".close__button")
const statsHp = document.querySelector(".stats__hp")
const statsAtk = document.querySelector(".stats__atk")
const statsDef = document.querySelector(".stats__def")
const statsSpecialAtk = document.querySelector(".stats__specialAtk")
const statsSpecialDef = document.querySelector(".stats__specialDef")
const statsSpeed = document.querySelector(".stats__speed")
const pokemonHeight = document.querySelector(".pokemon__height")
const pokemonWeight = document.querySelector(".pokemon__weight")
const pokemonMove = document.querySelector(".pokemon__move")
const pokemonMoveDescription = document.querySelector(".pokemon__move_description")
const backgroundLayer = document.querySelector(".background__layer")
const limit = 10;
let offset = 0;



loadMoreButton.addEventListener("click", () =>{
  offset += limit;
  loadMorePokemons(offset, limit);

});

function loadMorePokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    pokemons.map((pokemon) => createLi(pokemon));
    offset += limit
  });
  
  
  function createLi(pokemon) {
    const pokeLi = document.createElement("li");
    pokeLi.classList.add(pokemon.type);
    pokeLi.classList.add("pokemon");
    pokeList.appendChild(pokeLi);
    
    
    const spanNumb = document.createElement("span");
    spanNumb.setAttribute("class", "number");
    spanNumb.textContent = `#${pokemon.number}`;
    pokeLi.appendChild(spanNumb);
    
    const spanName = document.createElement("span");
    spanName.setAttribute("class", "name");
    spanName.textContent = pokemon.name;
    pokeLi.appendChild(spanName);
    
    const divDetail = document.createElement("div");
    divDetail.setAttribute("class", "detail");
    pokeLi.appendChild(divDetail);
    
    const typesOl = document.createElement("ol");
    typesOl.setAttribute("class", "types");
    divDetail.appendChild(typesOl);
    
    function createTypeLi(pokemon) {
      for (let i = 0; i < pokemon.types.length; i++) {
        const newLi = document.createElement("li");
        newLi.textContent = pokemon.types[i];
        newLi.classList.add("type");
        newLi.classList.add(pokemon.types[i]);
        typesOl.appendChild(newLi);
      }
    }
    createTypeLi(pokemon);
    
    const pokeImage = document.createElement("img");
    pokeImage.src = pokemon.photo;
    pokeImage.alt = pokemon.name;
    divDetail.appendChild(pokeImage);

    pokeLi.addEventListener("click", function(e) {
      pokeModal.classList.add(pokemon.type);  
      pokeModal.classList.add('modal-active');
      backgroundLayer.classList.add('layer-active');  
      const pokemonToModal = e.currentTarget;
      modalImage.src = pokemonToModal.childNodes[2].childNodes[1].src;
      modalImage.alt = pokemonToModal.childNodes[2].childNodes[1].src;
      modalTitle.textContent = pokemonToModal.childNodes[1].textContent;
      pokemonHeight.textContent = Math.round(pokemon.height * 10) + ' Cm';
      pokemonWeight.textContent = Math.round((pokemon.weight / 2.205)) + " Kg";
      pokemonMove.textContent = pokemon.move;
      statsAtk.value = pokemon.attack;
      statsHp.value = pokemon.hp;
      statsDef.value = pokemon.defense;
      statsSpecialAtk.value = pokemon.specialAtt;
      statsSpecialDef.value = pokemon.specialDef;
      statsSpeed.value = pokemon.speed;
    } )

    closeModal.addEventListener("click", () => {
      pokeModal.classList.remove('modal-active')
      pokeModal.classList.remove(pokemon.type) 
      backgroundLayer.classList.remove('layer-active');
    })
  }
}

loadMorePokemons(offset, limit);


