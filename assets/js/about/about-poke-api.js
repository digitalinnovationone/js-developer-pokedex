//Define uma URL base para acessar informações de gênero de Pokémon na API.
const genderUrl = "https://pokeapi.co/api/v2/gender/"  

const pokeApiAbout = {}

//convertpokeApiAboutDetailToPokemon(pokeDetail): Esta função recebe um objeto contendo detalhes de um Pokémon da PokeAPI e converte esses detalhes em um objeto PokemonAbout. Ela inclui informações como número, nome, tipos, foto, espécie, altura, peso, habilidades, estatísticas de base, movimentos e outros detalhes.
function convertpokeApiAboutDetailToPokemon(pokeDetail) {
    
    const pokemon = new PokemonAbout()
    pokemon.number = String(pokeDetail.id).padStart(3, '0')
    pokemon.name = pokeDetail.name    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

    // About
    pokemon.species = pokeDetail.species
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name).join(', ')

    // Base stats
    pokemon.stats = pokeDetail.stats

    // Evolution
    // to be implemented

    // Moves
    //pokemon.moves = pokeDetail.moves

    return pokemon
}

//Esta função recebe informações de espécie de um Pokémon e atualiza um objeto PokemonAbout com informações adicionais, como taxa de gênero, grupos de ovos e ciclo de chocamento.
function convertpokeApiAboutSpecieDetailToPokemom(pokeSpecie, pokemon){
    pokemon.gender = getGenderPercentages(pokeSpecie.gender_rate)
    pokemon.egg_groups = pokeSpecie.egg_groups.map((egggroup) => egggroup.name).join()
    pokemon.egg_cycle = pokeSpecie.hatch_counter * 255
    pokemon.species = pokemon.species.name

    return pokemon
}

//Esta função obtém informações de gênero de um Pokémon fazendo uma solicitação à API com base na URL da espécie do Pokémon. Em seguida, chama convertpokeApiAboutSpecieDetailToPokemom para adicionar informações de gênero ao objeto PokemonAbout.
pokeApiAbout.getPokeGender = (pokemon) => {
    return fetch(pokemon.species.url)
        .then((response) => response.json())
        .then((jsonBody) => convertpokeApiAboutSpecieDetailToPokemom(jsonBody, pokemon))
}

//Esta função obtém informações detalhadas de um Pokémon, incluindo informações de espécie e gênero, fazendo uma solicitação à API com base na URL do Pokémon. Ela usa as funções convertpokeApiAboutDetailToPokemon e pokeApiAbout.getPokeGender para construir o objeto PokemonAbout completo.
pokeApiAbout.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertpokeApiAboutDetailToPokemon)
        .then(pokeApiAbout.getPokeGender)
}

//sta função recebe uma taxa de gênero e retorna as porcentagens de gênero correspondentes para macho, fêmea e sem gênero, com base no valor da taxa de gênero. Essa função é usada para determinar as porcentagens de gênero dos Pokémon.
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