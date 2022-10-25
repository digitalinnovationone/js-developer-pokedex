const secao = document.getElementById('content')
let buttonAnterior = document.querySelector('#anterior')
let buttonProximo = document.querySelector('#proximo')

let offset = 0;

function detailPokemonToLi(pokemon) {
    return `
        <div class="item">
            <div class="pokemon ${pokemon.type + 'back'}">
                <div class="topo">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="detail">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="details detail informacoes">
                    <div class="detail" style="padding: .625rem;">
                        <img src="../assets/img/abilities.png?cb=1" alt="pokebola" style="
                            height: 3.1rem;">
                        <ol class="abilities">
                            ${pokemon.abilities.map((abilitie) => `<li class="abilitie">${abilitie}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="detail" style="padding: .625rem; ">
                        <img src="../assets/img/height.png" alt="pokebola" style="
                            height: 3rem;">
                        <span class="abilities">
                            ${pokemon.altura}m
                        </span>
                    </div>
                    <div class="detail" style="padding: .625rem;">
                        <img src="../assets/img/weight.png" alt="pokebola" style="
                            height: 5rem;">
                        <span>
                            ${pokemon.peso}Kg
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `
}

function loadPokemonDetails(offset) {
    if (offset === 0) {
        buttonAnterior.style.visibility = 'hidden';
    } else {
        buttonAnterior.style.visibility = 'visible';
    }

    pokeApi.getPokemons(offset, 1).then((details = []) => {
        const newHtml = details.map(detailPokemonToLi).join('')
        secao.innerHTML = newHtml
    })
}

loadPokemonDetails(offset)

buttonProximo.addEventListener('click', (proximo) =>{
    offset += 1
    loadPokemonDetails(offset)
})

buttonAnterior.addEventListener('click', (anterior) =>{
    offset -= 1
    loadPokemonDetails(offset)
})