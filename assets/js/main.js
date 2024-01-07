
function convertPokemonToLi(pokemon){
    return `<li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}"> ${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}">
    </div>
</li>`
}

function showPokemon(offset, limit){
    pokeAPI.getPokemons(offset,limit).then((pokemonList = []) => 
    pokemonLi.innerHTML = pokemonList.map(convertPokemonToLi).join(``)
)}

function buttonNext(){
    if(offset === maxPoke-10){
        offset +=10;
        limit = 1;
        console.log(`offset:${offset} | limit: ${limit} | maxPoke: ${maxPoke}`)
    }else{
        limit = 10;
        offset +=10;
        console.log(`offset:${offset} | limit: ${limit} | maxPoke: ${maxPoke}`)
    }
    pokedexStatus(offset,limit);
}
function buttonPrev(){
    offset -=10;
    pokedexStatus(offset);
}

function pokedexStatus(offset, limit){
    if(offset>0 && offset != maxPoke+10){
        console.log(`offset maior que 0 e diferente de maxPoke`)
        loadPrev.style.display = 'flex';
        loadNext.style.display = 'flex';
        showPokemon(offset,limit);
    }else if(offset<=0 && offset != maxPoke+10){
        console.log(`offset menor igual a0 e diferente de maxPoke`)
        loadPrev.style.display = 'none';
        showPokemon(offset,limit);
    }else if(offset === maxPoke+10){
        console.log(`offset igual maxPoke`)
        loadNext.style.display = 'none';
        showPokemon(offset,limit);
    }
}

let offset = 0, limit=10;
const maxPoke = 150;
const pokemonLi= document.getElementById(`pokemonList`);
const loadPrev = document.getElementById(`loadPrev`);
const loadNext = document.getElementById(`loadNext`);

pokedexStatus(offset,limit);

loadNext.addEventListener(`click`, () =>{
    buttonNext()
});
loadPrev.addEventListener(`click`, () =>{
    buttonPrev()
});

