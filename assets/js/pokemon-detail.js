const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;

async function createPokemonDetails(pokemonClicked) {

    const pokeName = pokemonClicked.querySelector('.name').textContent;
    const pokemon = await getPokemon(pokeName);

    console.log(pokemon);

    let modal = document.querySelector('.modal');
    let content = document.querySelector('.modal-content');
    modal.style.display = 'block';

    content.innerHTML = createUl(pokemon)

    let btn = document.createElement('button');
    btn.className = "btnclose";
    btn.innerHTML = 'Fechar';    
    btn.addEventListener('click', ()=>{
        modal.style.display = 'none';
    });
    content.appendChild(btn);


}

function createUl(pokemon) {
    let caixalta = pokemon.name.toUpperCase();
    return `
       <div class="pokemon-ul">
       <img src ="${pokemon.image}" class="imagepokemon">
           <ul>
               <li><strong>NAME: ${caixalta}</strong></li>
               <li>HP: ${pokemon.hp}</li>
               <li>ATTACK: ${pokemon.attack}</li>
               <li>DEFFENSE: ${pokemon.deffense}</li>
               <li>SPECIAL ATTACK: ${pokemon.specialAttack}</li>
               <li>SPECIAL DEFFENSE: ${pokemon.specialDefense}</li>
               <li>SPEED: ${pokemon.speed}</li>
            </ul>
       </div>

    `
}

async function getPokemon(pokemon) {

    let data = await fetch(pokemonUrl + `${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const pokemon = {
                name: data.name,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                deffense: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
                image: data.sprites.front_default
            }
            console.log(pokemon);

            return pokemon;
        })
        .catch((error) => console.log(error));

    return data;
}

