const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10;
let offset = 0;
let pokemonsObjs = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function pokeModal(pokemons) {
    let pokemonCards = document.querySelectorAll('.pokemon');
    let modalPokemon = document.querySelector('.pokeModal');
    let chosenPokemon;

    pokemonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            chosenPokemon = e.currentTarget.getElementsByClassName('name')[0].innerText.toLowerCase();
            let pokemonObject = pokemons.filter((pokemon) => pokemon.name === chosenPokemon);
            
            if(chosenPokemon === pokemonObject[0].name) {
                let pokeObj = pokemonObject[0];
                console.log(pokeObj);
                let html = '';

                html += '<div class="modal fade" id="'+ chosenPokemon +'Modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'
                html += '    <div class="modal-dialog modal-dialog-centered">'
                html += `        <div class="modal-content ${pokeObj.type}">`
                html += '           <div class="modal-header">'
                html += '               <h1 class="modal-title" id="staticBackdropLabel">'+ chosenPokemon +'</h1>'
                html += '               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                html += '           </div>'
                html += '            <div class="modal-body">'
                html += '                            <div style="width: 100%; padding-left: 1rem; margin-bottom: 1rem;">'
                if(pokeObj.types) {
                    pokeObj.types.forEach(type => {
                        html += `<span class="type ${type} me-2">${type}</span>`
                    })
                }
                html += '                            </div>'
                html += `                   <img src="${pokeObj.photo}" alt="${chosenPokemon}" class="img-fluid">`
                html += '                   <div class="stats">'
                html += '                       <ul>'
                if (pokeObj.stats) {
                    pokeObj.stats.map(stat => {
                        html += '<li>'
                        html += '    <div class="stat">'
                        html += `        <span class="stat-name">${stat.stat.name}: </span>`
                        html += `        <span class="base-stat">${stat.base_stat}</span>`
                        html += '    </div>'
                        html += `    <div class="rate">`
                        html += `       <div class="${stat.base_stat > 50 ? 'green' : 'red'}" style="width: ${stat.base_stat > 100 ? 100 : stat.base_stat}%"></div>`
                        html += `    </div>`
                        html += '</li>'
                    })
                }
                html += '                       </ul>'
                html += '                   </div>'
                html += '            </div>'
                html += '        </div>'
                html += '    </div>'
                html += '</div>'

                modalPokemon.innerHTML = html;
                
                let modalElement = document.getElementById(`${chosenPokemon}Modal`);
                if(modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                } else {
                    console.error(`Modal não encontrado para ${chosenPokemon}`);
                }
            }
        })
    });
    
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;

        pokemons.forEach(pokemon => pokemonsObjs.push(pokemon));
        pokeModal(pokemonsObjs)
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})