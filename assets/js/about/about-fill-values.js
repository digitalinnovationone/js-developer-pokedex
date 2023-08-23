const aboutValues = document.getElementById('about-values')
const pokeDataDetails = document.getElementById('poke-data-details')

// Get pokemon details from session storage
window.onload = function () {
    var pokemonDetail = JSON.parse(sessionStorage.getItem('pokemon'))
    fillValuesAboutPokemon(pokemonDetail)
    document.body.classList.add(pokemonDetail.type)
}

function fillValuesAboutPokemon(pokemonValues){
    let tot_stat = 0;
    const aboutValuesHtml = `
        <div id="title" class="title-values">
            <h1> ${pokemonValues.name} </h1>
            <h3> ${pokemonValues.number} </h3>
        </div>
        <div>
            ${pokemonValues.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
        </div>
        <div class="poke-img-container">
            <img alt="imagem do pokemon" src="${pokemonValues.photo}">
        </div>
    `

    const pokeDataDetailsHtml = `
    <table>
        <thead>
            <tr class="poke-about-headline">
                <th class="active-header about" data-section="about">About</th>
                <th class="base-stats" data-section="base-stats">Base Stats</th>
                <th class="evolution" data-section="evolution">Evolution</th>
                <th class="moves" data-section="moves">Moves</th>
            </tr>
        </thead>
        <tbody>
            <!-- About section -->
            <tr class="about show">
                <td>Species</td>
                <td colspan="3">${pokemonValues.species}</td>
            </tr>
            <tr class="about show">
                <td>Height</td>
                <td colspan="3">${pokemonValues.height}</td>
            </tr>
            <tr class="about show">
                <td>Weight</td>
                <td colspan="3">${pokemonValues.weight}</td>
            </tr>
            <tr class="about show">
                <td>Abilities</td>
                <td colspan="3">${pokemonValues.abilities}</td>
            </tr>                
            <tr class="about show">
                <td>Species</td>
                <td colspan="3">${pokemonValues.species}</td>      
            </tr>

            <!-- Base Stats section -->
            ${pokemonValues.stats.map((stat) => {
                tot_stat += Number(stat.base_stat)
                return `
                    <tr class="base-stats hide">
                        <td class="stat-name">${stat.stat.name}</td>
                        <td class="stat-number">${stat.base_stat}</td>
                        <td class="stat-gauge" colspan="2">
                            <div class="gauge">
                                <div class="${stat.base_stat > 50 ? 'fill-green' : 'fill-red'}" style="width: ${stat.base_stat -20}%;"></div>
                            </div>
                        </td>
                    </tr>
                `}).join('')}
            <tr class="base-stats hide">
                <td class="stat-name">Total</td>
                <td class="stat-number">${tot_stat}</td>
                <td class="stat-gauge" colspan="2">
                    <div class="gauge">
                        <div class="${tot_stat > 300 ? 'fill-green' : 'fill-red'}" style="width: ${tot_stat / 6}%;"></div>
                    </div>
                </td>    
        </tbody>
    </table>
    <!-- Breeding -->
    <table style="padding: 0 0 4em 0;" class="about show">
        <tbody>
            <tr class="about show">
                <td><h4>Breeding</h4></td>
            </tr>
            <tr class="about show">
                <td>Gender</td>
                <td colspan="3"><span class="male">&#9794;</span>${pokemonValues.gender.male}<span class="female">&#9792;</span>${pokemonValues.gender.female}</td>
            </tr>
            <tr class="about show">
                <td>Egg Groups</td>
                <td colspan="3"> ${pokemonValues.egg_groups}</td>
            </tr>
            <tr class="about show">
                <td>Egg Cycle</td>
                <td colspan="3">${pokemonValues.egg_cycle}</td>
            </tr>
        </tbody>    
    </table>
    <!-- Type defenses -->
    <table style="padding: 0 0 4em 0;">
        <tbody>
            <tr class="base-stats hide">
                <td><h4>Type defenses</h4></td>
            </tr>
            <tr class="base-stats hide text-stype">
                <td colspan="4">The effectiveness of each type on</td>
            </tr>
        </tbody>    
    </table>
    `

    aboutValues.innerHTML = aboutValuesHtml
    pokeDataDetails.innerHTML = pokeDataDetailsHtml

    // Had to be put here so the querySelectorAll can grab elements created here
    changeTableDetails()
}




function changeTableDetails() {
    // Get all the table header cells
    const headers = document.querySelectorAll('th');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            const section = header.getAttribute('data-section');
            
            // Hide all rows
            const allRows = document.querySelectorAll('tbody tr');

            allRows.forEach(row => {
                row.classList.remove('show');
                row.classList.add('hide')
            })

            // Show only the rows of the clicked section
            const sectionRows = document.querySelectorAll(`tbody tr.${section}`);
            sectionRows.forEach(row => {
                row.classList.add('show');
                row.classList.remove('hide')
            })

            // Move the underline style of menu item
            // Remove the underline
            const allMenuItems = document.querySelectorAll(`thead th`)
            allMenuItems.forEach(menuItem => menuItem.classList.remove('active-header'))

            // Add the underline
            const selectedMenu = document.querySelectorAll(`thead th.${section}`)
            selectedMenu.forEach(menuItem => menuItem.classList.add('active-header'))
        });
    });
}

