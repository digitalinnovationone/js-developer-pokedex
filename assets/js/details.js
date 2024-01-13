
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonNumber = urlParams.get('number');
    const pokemonName = urlParams.get('name');
    const pokemonPhoto = urlParams.get('photo');


    const pokemonDetailsDiv = document.getElementById('pokemonDetails');
    pokemonDetailsDiv.innerHTML = `
  <h2>Nome: ${pokemonName}</h2>
        <img src="${pokemonPhoto}" alt="${pokemonName}">
        <p>Número do Pokemon: ${pokemonNumber}</p>
    `;
});
