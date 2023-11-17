const pokemonPage = document.querySelector('#pokemonPage')
const pokedex = document.querySelector('#pokedex')
const pName = document.querySelector('#pName')
const pNumber = document.querySelector('#pNumber')
const api = 'https://pokeapi.co/api/v2/'

async function getPokemonsSpecies(id, info, gender) {
    const response = await fetch(`${api}pokemon-species/${id}`)
    
    if (info == 'egg_groups') {
        const data = await response.json().then(dataSpecie => dataSpecie.egg_groups.map(eggs => eggs.name).join(', '))

        return `${data}`
    } else if (info == 'specie'){
        const data = await response.json().then(genera => genera.genera[7].genus)
        return `${data}`.split(' ')[0]
    } else {
        const data = await response.json().then(gender => gender.gender_rate)
        
        if (gender == 'male') {
            if (data == 1) {
                return '87,5%'
            } else if (data == 2) {
                return '75,0%'
            } else if (data == 3) {
                return '50,0%'
            } else if (data == 4) {
                return '25,0%'
            } else if (data == 5) {
                return '0,0%'
            } else if (data == 0) {
                return '100,0%'
            }
        } else {
            if (data == 1) {
                return '12,5%'
            } else if (data == 2) {
                return '25,0%'
            } else if (data == 3) {
                return '50,0%'
            } else if (data == 4) {
                return '75,0%'
            } else if (data == 5) {
                return '100,0%'
            } else if (data == 0) {
                return '0,0%'
            }
        }
    }
}

async function getPokemon(pokemon) {
    const response = await fetch(`${api}pokemon/${pokemon}`)
    const data = await response.json()

    if (!pokedex.hasAttribute('hidden')) {
        pokedex.setAttribute('hidden', 'true')

        pokemonPage.innerHTML = `
            <section class="content-stats ${data.types[0].type.name}" id="pokemonInfo">
                <div class="pokemon-top">
                    <a href="index.html"><span class="material-symbols-outlined">arrow_back</span></a>
                    <span class="material-symbols-outlined">favorite</span>
                </div>

                <div class="pokemon-name name">
                    <span>${data.name[0].toUpperCase() + data.name.substring(1)}</span>
                    <span>#${data.id}</span>
                </div>

                <div class="details">
                    <ol class="types">
                    ${data.types.map((type) => `<li class="type">${type.type.name}</li>`).join('')}
                    </ol>
                </div>

                <div class="pokemon-image">        
                    <img src="${data.sprites.other.home.front_default}" alt="${data.name}">
                </div>
            </section>

            <div class="pokemon-stats" id="pokemonStats">
                <nav>
                    <ul>
                        <li class="active">About</li>
                        <li>Base Stats</li>
                        <li>Evolution</li>
                        <li>Moves</li>
                    </ul>
                </nav>

                <div class="info-table">
                    <table>
                        <tr>
                            <td class="item">Species</td>
                            <td class="description">${await getPokemonsSpecies(data.id, 'specie')}</td>
                        </tr>
                        <tr>
                            <td class="item">Height</td>
                            <td class="description">${data.height/10} m</td>
                        </tr>
                        <tr>
                            <td class="item">Weight</td>
                            <td class="description">${data.weight/10} Kg</td>
                        </tr>
                        <tr>
                            <td class="item">Abilities</td>
                            <td class="description">${data.abilities.map((ability) => ability.ability.name).join(', ')}</td>
                        </tr>
                        <th>Breeding</th>
                            <tr>
                                <td class="item">Gender</td>
                                <td class="description gender">
                                    <span class="material-symbols-outlined male">
                                        male
                                    </span> ${await getPokemonsSpecies(data.id, ' ', 'male')}
                                    <span class="material-symbols-outlined female">
                                        female
                                    </span> ${await getPokemonsSpecies(data.id, ' ', 'female')}
                                </td>
                            </tr>
                            <tr>
                                <td class="item">Egg Groups</td>
                                <td class="description">${await getPokemonsSpecies(data.id,   'egg_groups')}</td>
                            </tr>
                    </table>
                </div>
            </div>
            `
    } 
}