const pokemonDetailedPage = {};

pokemonDetailedPage.convertPokeApiDetailToPokemon = (pokeDetail) => {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    const abilities = pokeDetail.abilities.map((slot) => slot.ability.name);
    pokemon.abilities = abilities;

    pokemon.photo2 = pokeDetail.sprites.other['official-artwork'].front_default;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;

    return pokemon;
};

pokemonDetailedPage.getMorePokemonDetail = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${ pokemon.number }`;
    fetch(url)
        .then((response) => response.json())
        .then((details) => {
            pokemon.eggGroups = details.egg_groups.map((slot) => slot.name);
            pokemon.growthRate = details.growth_rate.name;
            return details;
        })
        .then((details) => {
            document.getElementById('egg-groups').innerHTML = pokemon.eggGroups.map((group) => `<div>${group}</div>`).join('|');
            document.getElementById('growth-rate').innerHTML = pokemon.growthRate;
        }
        );

};

pokemonDetailedPage.getNumberFormated = (pokemon) => { 
    const paddedNumber = (pokemon.number).toString().padStart(3, '0');
    pokemon.number = `#${paddedNumber}`;
}

pokemonDetailedPage.getPokemonDetail = (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    return fetch(url)
        .then((response) => response.json())
        .then(pokemonDetailedPage.convertPokeApiDetailToPokemon)
        .then((pokemon) => {
            document.getElementById('background-color').classList.add(pokemon.types[0]);
            document.getElementById('number').innerHTML = `#${pokemon.number}`;
            document.getElementById('name').innerHTML = pokemon.name;
            document.getElementById('types').innerHTML = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
            document.getElementById('weight').innerHTML = pokemon.weight;
            document.getElementById('height').innerHTML = pokemon.height;
            document.getElementById('abilities').innerHTML = pokemon.abilities.map((ability) => `<div>${ability}</div>`).join('|');
            document.getElementById('picture').innerHTML = `<img src=" ${ pokemon.photo2 }">`;
            pokemonDetailedPage.getMorePokemonDetail(pokemon);
            pokemonDetailedPage.getNumberFormated(pokemon);
 
        });
};



const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('pokemon');
document.title = pokemonName;

const pokemonDataPromise = pokemonDetailedPage.getPokemonDetail(pokemonName);

pokemonDataPromise.then((pokemon) => {

}).catch((error) => {
    window.location.href="index.html";
});
