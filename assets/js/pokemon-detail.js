const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;
/* const url = `https://pokeapi.co/api/v2/stat/`; */


async function createPokemonDetails(pokemonClicked){    
    const pokeName = pokemonClicked.querySelector('.name').textContent;
    console.log(pokeName);
    /* let pokeNumber = pokemonClicked.querySelector('.number').textContent; */
    
    const pokemon = await getPokemon(pokeName);
    
    console.log(pokemon);
    

    
    let modal = document.querySelector('.modal');
    let content = document.querySelector('.modal-content');
    modal.style.display = 'block';

    
    
}

async function getPokemon(pokemon){
    
    let data = await fetch(pokemonUrl+`${pokemon}`)
    .then((response)=> response.json())
    .then((data)=> {
        
        console.log(data);

        const pokemon ={
            name: data.name,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            deffense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
            //image: data.sprites.other.official-artwork.front_shiny
        }
        console.log(pokemon);

        return pokemon;
    })
    .catch((error)=> console.log(error));

return data;
}



 
/* function getPokemon(pokemon){
    
    fetch(pokemonUrl+`${pokemon}`)
    .then((response)=> response.json())
    .then((data)=> data.results)
    .then((results)=> console.log(results))
    .catch((error)=> console.log(error));
}
 
 */

/* function getPokemon(param){
   fetch(pokemonUrl+`${param}`)
   .then((response)=> response.json())
   .then((data)=> {
       console.log(data.results);
   })
   .catch((error)=> console.log(error));
} 
 */


/* async function getPokemon(pokemon) {
    
    try {
        const response = (await fetch(pokemonUrl + `${pokemon}`))
        
        return response.json();
        
    } catch (error) {
        console.error(error);
    }
} */