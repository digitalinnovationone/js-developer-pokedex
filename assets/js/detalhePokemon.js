
    const selectPokemon = async (number) => { 
            pokeApi.getPokemonFull(number-1, 1).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonFullToLi).join('')
            pokemonFull.innerHTML = newHtml;

    })}


    function convertPokemonFullToLi(pokemon) {
        
        const numPokemon = pokemon.number;
        return `
        <li class="pokemonFull ${pokemon.type}" onclick = "selectPokemon(${numPokemon})">
            <tr>
                <td>#${numPokemon}  <div class="name">${pokemon.name}</div> </td>
                <td> <img src="${pokemon.photo}" alt="${pokemon.name}"></td>
                <td>
                    <table>
                        <tr>
                            <td> Tipo(s):</td>
                            <td>${pokemon.types.map((type) => `${type}`).join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Habilidade: </td>
                            <td> ${pokemon.ability}</td>
                        </tr>
                        <tr>
                            <td>Experiência base: </td>
                            <td> ${pokemon.base_experience}</td>
                        </tr>
                        <tr>
                            <td>HP: </td>
                            <td> ${pokemon.hp}</td>
                        </tr>
                        <tr>
                            <td>Ataque: </td>
                            <td> ${pokemon.attack}</td>
                        </tr>
                        <tr>
                            <td> Defesa: </td>
                            <td> ${pokemon.defense}</td>
                        </tr>
                        <tr> 
                            <td>Ataque Especial: </td>
                            <td> ${pokemon.specialAttack}</td>
                        </tr>
                        <tr>
                            <td>Defesa Especial: </td>
                            <td> ${pokemon.specialDefense}</td>
                        </tr>
                        <tr>
                            <td>Velocidade: </td>
                            <td> ${pokemon.speed}</td>
                        </tr>
                        <tr>
                            <td>Peso: </td>
                            <td>${pokemon.weight}</td>
                        </tr>
                    </table>
            </tr>
        </li>

        `
    }    

