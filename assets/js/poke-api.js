
const pokeApi = {}
const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertMoreInformationPokemon (info)  {
    const moreInformation = new MoreInfoPokemon()

    moreInformation.about.weight= info.weight / 10;
    moreInformation.about.height = info.height / 10;
    moreInformation.about.ability = info.abilities.map((element) => element.ability.name);
    pokeApi.getMoreInfoSpecieFromPokemon(info.species.url)
        .then((responseData) => {
        moreInformation.about.egg_groups = responseData.egg_groups[0].name;
        moreInformation.about.species = responseData.genera[6].genus
    });
    moreInformation.about.egg_cycle = info.types[0].type.name     
    moreInformation.about.types =  info.types.map((typeSlot) => typeSlot.type.name) 
    moreInformation.about = [moreInformation.about]
    
    moreInformation.baseStats = info.stats;
    moreInformation.id = info.id;
    moreInformation.photo =  info.sprites.other.dream_world.front_default      

    return moreInformation
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `${BASE_URL}?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getByPokemonName = (namePokemon) =>{
    const url =`${BASE_URL}/${namePokemon}`

    return fetch(url)
    .then(resp => resp.json())
    .then(convertMoreInformationPokemon)
}

pokeApi.getMoreInfoSpecieFromPokemon = (urlParam) =>{
   return fetch(urlParam)
                        .then((resp) => resp.json())


}