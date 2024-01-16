const pokemonDetail = document.getElementById('pokemonDetail')

function showDetails(pokemonStatus) {
    return `
        <div class="block">
            <div class="pokemonStatus ${pokemonStatus.type}">
                <div class="topBlock">
                <h1 class="favorite">♡</h1>
                <a class="back" href="/index.html">←</a>
                </div>

                <div class="middleBlock">
                <span class="name">${pokemonStatus.name}</span>
                <span class="numberPokemon">#${pokemonStatus.number}</span>

                    <div class="detailPokemon">
                        <ol class="typesPokemon">
                            ${pokemonStatus.types.map((type) => `<li class="typePokemon">${type}</li>`).join('')}
                        </ol>
                    </div>

                    <img class="imagemInvertida" src="${pokemonStatus.photo}"
                    alt="${pokemonStatus.name}">

                </div>
            </div>
            <div class="block2">
                <div class="lowerStatus">
                    <spam class="about">About</spam>
                    <ol class="block3">
                        <ol class="olStatus">
                        <table>
                            <tr>
                            <th>Species</th>
                            <th class="resp">${pokemonStatus.type}</th>
                            </tr>
                            <tr>
                            <th>Height</th>
                            <th class="resp">${pokemonStatus.height}</th>
                            </tr>                                
                            <tr>
                            <th>Weight</th>
                            <th class="resp">${pokemonStatus.weight}</th>
                            </tr>                                
                            <tr>
                            <th>Abilities</th>
                            <th class="resp">${pokemonStatus.abilities.map((ability) => `<spam>${ability}</spam>`).join(', ')}</th>
                            </tr>                                
                        </table>
                        </ol>
                    </ol>                   
                </div>
            </div>
        </div>
    `
}

const parametro = new URLSearchParams(window.location.search);

const pokeName = parametro.get('name')

function loadPokemonDetails(name) {
    pokeApi.getPokemon(name)
        .then((pokemonStatus) => {
            pokemonDetail.innerHTML = showDetails(pokemonStatus)
        })

}

loadPokemonDetails(pokeName)
