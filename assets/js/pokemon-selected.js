const pokedexContainer = document.querySelector(".content");
const containerSelected = document.querySelector(".container-selectedPokemon");

pokedexContainer.addEventListener('click', function (e) {
    const pokemonSelected = e.target.closest("li")
    const pokemonId = pokemonSelected.id
    let limit;

        if(typeof parseInt(pokemonId) == 'number' && pokemonId !== ''){

        const poke2 = pokeApi.getPokemonsArr(pokemonId -1, limit = 1).then((pokemonsArr) => {
            const newSelected = pokemonsArr.map((pokemon) => convertPokeSelected(pokemon));
            containerSelected.innerHTML = newSelected;

        })
    }
})


function convertPokeSelected (pokemon) {
    containerSelected.style.display = "flex"
    irParaPainel()
    return `
    <div class="selectedPokemon ${pokemon.types[0]}">
                <div class="selectedPokemon-header ${pokemon.types[0]}">
                    <h3>POKEMÓN</h3>
                    <div class="container-imgPokemon">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.number}.svg" alt="${pokemon.name}" width="150px" height="150px">
                    </div>
                </div>
                <ul>
                    <li>Name: <span style="text-transform: capitalize">${pokemon.name}</span</li>
                    <li>Number: ${pokemon.number}</li>
                    <li>Type: ${pokemon.types.join(' & ')}</li>
                    <li>Região: ${pokemon.number < 152 ? 'Kanto' : 'Other' }  </li>
                    <li>Heigth: ${pokemon.height}dm</li>
                    <li>Weigth: ${pokemon.weight}hg</li>
                    <li id="abilities">Abilities: ${pokemon.ability}</li>
                </ul>
            </div>
    `
}

function irParaPainel(){
    window.scrollTo(0, 250);
}




