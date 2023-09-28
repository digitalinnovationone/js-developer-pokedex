const pokemonDetailsLi = document.getElementById('pokemonDetailsLi')

function convertPokemonToDetailsLi(pokemon) {
    return `
    <div class="name">${pokemon.name}</div>
    <div class="number">#${pokemon.number}</div>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>

        <img src="${pokemon.photo}"
            alt="${pokemon.name}">

        <div class="information">
            <ol id="pokemonDetails" class="informationsPokemom">
                <li class="about"><strong>About</strong>
                    <hr>
                    <ul>Species</ul>
                    <ul>${pokemon.height}</ul>
                    <ul>${pokemon.weight}</ul>
                    <ul>${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}</ul>
                </li>        
                        
                <li class="breeding"><strong>Breeding</strong>
                        <ul>Gender</ul>
                        <ul>Egg Groups</ul>
                        <ul>Egg Cycle</ul>
                </li>
                
            </ol>
        </div>
    `
}