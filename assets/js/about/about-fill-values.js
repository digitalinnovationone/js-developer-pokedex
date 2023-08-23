const section = document.getElementById('about-values')

// get pokemon details from session storage
window.onload = function () {
    var pokemonDetail = JSON.parse(sessionStorage.getItem('pokemon'))
    fillValuesAboutPokemon(pokemonDetail)
    document.body.classList.add(pokemonDetail.type)
}

function fillValuesAboutPokemon(pokemonValues){

    // sectionHtml = `
       

    // `

    // section.innerHTML = sectionHtml
}

