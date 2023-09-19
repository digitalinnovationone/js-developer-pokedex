// const detailsPokemon = document.getElementById('detailsPokemon')

// function queryString(parameter) {
//     var loc = location.search.substring(1, location.search.length);
//     var param_value = false;
//     var params = loc.split("&");
//     for (i = 0; i < params.length; i++) {
//         param_name = params[i].substring(0, params[i].indexOf('='));
//         if (param_name == parameter) {
//             param_value = params[i].substring(params[i].indexOf('=') + 1)
//         }
//     }
//     if (param_value) {
//         return param_value;
//     }
//     else {
//         return undefined;
//     }
// }

// pokemon = queryString("pokemon");

// loadPokemon(pokemon)

// function showDetailPokemon(pokemon) {
//     return ` 
//     <span class="number">#${pokemon.number}</span>
//     <span class="name">${pokemon.name}</span>
//     `
// }

// function loadPokemon(pokemon) {
//     const newHtml = pokemon.map(showDetailPokemon)
//     detailsPokemon.innerHTML += newHtml
// }