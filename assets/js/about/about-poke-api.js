const genderUrl = "https://pokeapi.co/api/v2/gender/"

const pokeApiAbout = {}

function convertpokeApiAboutDetailToPokemon(pokeDetail) {
    
    // console.log(pokeDetail)
    const pokemon = new PokemonAbout()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // About
    pokemon.species = pokeDetail.species
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name)

    // Base stats
    pokemon.stats = pokeDetail.stats

    return pokemon
}

function convertpokeApiAboutSpecieDetailToPokemom(pokeSpecie, pokemon){
    pokemon.gender = getGenderPercentages(pokeSpecie.gender_rate)
    pokemon.egg_groups = pokeSpecie.egg_groups.map((egggroup) => egggroup.name).join()
    pokemon.egg_cycle = pokeSpecie.hatch_counter * 255
    pokemon.species = pokemon.species.name

    return pokemon
}

pokeApiAbout.getPokeGender = (pokemon) => {
    return fetch(pokemon.species.url)
        .then((response) => response.json())
        .then((jsonBody) => convertpokeApiAboutSpecieDetailToPokemom(jsonBody, pokemon))
}

pokeApiAbout.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertpokeApiAboutDetailToPokemon)
        .then(pokeApiAbout.getPokeGender)
}

function getGenderPercentages(gender_rate) {
    switch (gender_rate) {
        case -1:
            return { male: 0, female: 0, genderless: 100 };
        case 0:
            return { male: 100, female: 0 };
        case 1:
            return { male: 87.5, female: 12.5 };
        case 2:
            return { male: 75, female: 25 };
        case 3:
            return { male: 62.5, female: 37.5 };
        case 4:
            return { male: 50, female: 50 };
        case 5:
            return { male: 37.5, female: 62.5 };
        case 6:
            return { male: 25, female: 75 };
        case 7:
            return { male: 12.5, female: 87.5 };
        case 8:
            return { male: 0, female: 100 };
        default:
            throw new Error("Invalid gender_rate value");
    }
}