const pokeApi = {}

function addZeroes(pokemonOrder) {
    var numberWithZeroes = String(pokemonOrder);
    var counter = numberWithZeroes.length;
      
    while(counter < 3) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
  return numberWithZeroes;
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon;
    
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types

    pokemon.types = types
    pokemon.type = type1

    pokemon.photo = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${addZeroes(pokemon.id)}.png`

    //Pokemon Details
    pokemon.ability = pokeDetail.abilities
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    //Pokemon Stats
    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const [hp, attack, def, spAtk, spDef, speed] = stats

    pokemon.hp = hp
    pokemon.attack = attack
    pokemon.defense = def
    pokemon.spAtk = spAtk
    pokemon.spDef = spDef
    pokemon.speed = speed
    pokemon.total = hp+attack+def+spAtk+spDef+speed

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    // retorna a nova requisição
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemon) => convertPokeApiDetailToPokemon(pokemon))
}

pokeApi.getPokemonDetailById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => convertPokeApiDetailToPokemon(pokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Requisição
    return fetch(url)
        // convertendo o response para json
        .then((response) => response.json())
        // recebendo o response convertido e pega só os results
        .then((responseJson) => responseJson.results)
        // nova requisição e armazenando em uma lista
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)     
}