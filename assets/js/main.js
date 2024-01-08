const content = document.getElementById('content');

const mainTemplate = document.getElementById('mainTemplate')

const detailTemplate = document.getElementById('detailTemplate')

content.innerHTML = mainTemplate.innerHTML;

let pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 51
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="verPkm(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    console.log("Aqui");
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    pokemonList = document.getElementById('pokemonList')
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

async function verPkm(id) {

    const pkmDetail = await pokeApi.getPkm(id);

    template = detailTemplate.innerHTML;

    newHtml = template
        .replaceAll("{pkm.name}", pkmDetail.name)
        .replaceAll("{pkm.image}", pkmDetail.photo)
        .replaceAll("{pkm.type}", pkmDetail.type)
        .replaceAll("{pkm.number}", pkmDetail.number)
        .replaceAll("{pkm.types}", pkmDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join(''))
        .replaceAll("{pkm.weight}", pkmDetail.weight/10)
        .replaceAll("{pkm.height}", pkmDetail.weight/100)
        
    content.innerHTML = newHtml;

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: pkmDetail.stats.map((stat) => stat.name),
            datasets: [{
                label: 'Stats',
                data: pkmDetail.stats.map((stat) => stat.stat),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointHoverBorderColor: '#fff',
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                }
            },
        }
    });
}

function voltar() {
    content.innerHTML = mainTemplate.innerHTML;
    pokemonList = document.getElementById('pokemonList')
    offset = 0
    loadPokemonItens(offset, limit)

}

function proximo(id) {
    console.log(parseInt(id))
    verPkm(parseInt(id) + 1)
}

function anterior(id) {
    verPkm(parseInt(id) - 1)
}