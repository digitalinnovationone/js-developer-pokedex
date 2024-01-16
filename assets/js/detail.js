const PkmnID = new URL(window.location).searchParams.get('id');
const PokemonDataInsert = document.getElementById('PokemonDataInsert')
const tabLinks = document.querySelectorAll('.tabLinks');
const url = `https://pokeapi.co/api/v2/pokemon/${PkmnID}`;


tabLinks.forEach(link => {
    link.addEventListener('click', e => indicador(e))
})
function fillCard(pokemonData){
    const pkmnName = document.getElementById('pkmnName');
    const pkmnNum = document.getElementById('pkmnNum');
    const bgColor = document.getElementById('bgColor');
    const pkmnPic = document.querySelector('.pkmnPic');
    const types = document.getElementsByClassName('types')[0];
    pkmnName.innerText = pokemonData.name;
    pkmnNum.innerText = pokemonData.number < 10 ? `#00${pokemonData.number}` : ( pokemonData.number < 100 ? `#0${pokemonData.number}` : `#${pokemonData.number}`) 
    pkmnPic.src = pokemonData.photo;
    bgColor.classList.add(pokemonData.types[0])
    types.innerHTML = pokemonData.types.map(type => `<li class="type ${type}">${type}</li>`).join(' ');

    console.log(types)

}
function createPokemonAboutData(pokemonData) {
    const male = Math.random()*100;
    const female = 100-male;
    return (`
    <div id="AboutData" class="PkmnDataGrid">
          <div class="dataTitle">
            <p>Species</p>
            <p>Height</p>
            <p>Weight</p>
            <p>Abilities</p>
          </div>
          <!-- hidratado via Api -->
        <div class="dataValue">
          <p>${pokemonData.species}</p>
          <p>${pokemonData.height}</p>
          <p>${pokemonData.weight}</p>
          <p>${pokemonData.abilities.map(ability => `<span>${ability.name}</span>`).join(' | ')}</p>
        </div>
          <!--  -->
        </div>
        <div>Breending</div>
        <div id="BreedData" class="PkmnDataGrid">
          <div class="dataTitle">
            <p>Gender</p>
            <p>Egg Groups</p>
            <p>Egg Cycle</p>
          </div>
          <div class="dataValue">
            <p>
              <i class="fa-solid fa-mars"></i> ${male.toFixed(2)}%
              <i class="fa-solid fa-venus"></i> ${female.toFixed(2)}%
            </p>
            <p>${pokemonData.egg_groups.map(egg => `<span>${egg}</span>`).join(' | ') }</p>
            <p>${pokemonData.habitat.name}</p>
          </div>
        </div>
      </div>
    `)
}

function indicador(e) {
    const marker = document.getElementById('marker');
    const target = e.target ? e.target : e;
    marker.style.left = target.offsetLeft+"px";
    marker.style.width = target.offsetWidth+"px";
    tabLinks.forEach( link => link.classList.remove('active'))
    target.classList.add('active')
}
indicador(tabLinks[0])

function loadData(event){
    const {target} = event;
    console.log(target)
    
}
async function convertPokeApiDetailToPokemonAbout(pokeDetail) {
    console.log(pokeDetail)
    const breedData = await fetch(pokeDetail.species.url).then( r => r.json())
    const pokemon = new PokemonAbout();
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map(item => item.ability);
    pokemon.egg_groups = breedData.egg_groups.map(item => item.name);
    pokemon.habitat = breedData.habitat;
    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default
    return pokemon
}

fetch(url)
        .then(r => r.json())
        .then( json => {
            const pkmn = convertPokeApiDetailToPokemon(json);
            fillCard(pkmn);
            return convertPokeApiDetailToPokemonAbout(json)
        })
        .then(pokemonData => createPokemonAboutData(pokemonData))
        .then(pokemonElement => PokemonDataInsert.insertAdjacentHTML('beforeend', pokemonElement))