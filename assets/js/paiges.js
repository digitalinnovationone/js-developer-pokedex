const parametros= new URLSearchParams(window.location.search)
const id= parametros.get('id')
const content= document.querySelector('#content')


function pokemonToPokePaige(pokemon){
    content.className=pokemon.types[0]

    return`
        
                
        <header>
            <a href="../index.html">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <div>
                <i class="fa-regular fa-heart"></i>
            </div>

        </header>
        <main>
            <div class="perfil">
                
                <h1>${pokemon.name}</h1>
                <span>#${pokemon.id.toString().padStart(3, 0)}</span>
                
                <ol class="type">
                    ${pokemon.types.map((type)=>`<li>${type}</li>`).join('')}
                </ol>
                <img class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="imagem de ${pokemon.name}">
            
            </div>
            <div class="info">
                
                <div>
                    <table>
                        <tr>
                            <th scope="row">epecies</th>
                            <td>${pokemon.specie}</td>
                        </tr>
                        <tr>
                            <th scope="row">height</th>
                            <td>${pokemon.height}</td>
                        </tr>
                        <tr>
                            <th scope="row">weight</th>
                            <td>${pokemon.weight}</td>
                        </tr>
                        <tr>
                            <th scope="row">abilities</th>
                            <td>${pokemon.abilities.join(', ')}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    
    `
}


pokeApi.getSinglePokemon(id)
.then((pokemon)=>content.innerHTML+=(pokemonToPokePaige(pokemon)))
