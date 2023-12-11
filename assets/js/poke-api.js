// Objeto que contém métodos relacionados à PokeAPI
const pokeApi = {}

// Função para converter detalhes da PokeAPI em objetos Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)  // Mapeia os tipos do Pokémon
    const [type] = types

    pokemon.types = types // Configura propriedades do Pokémon
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default // Obtém a URL da imagem do Pokémon

    return pokemon
}



// Obtém detalhes de um Pokémon específico usando sua URL
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

// Obtém uma lista de Pokémon da PokeAPI com base no deslocamento e limite
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}` // Constrói a URL para a requisição da lista de Pokémon
    
    // Faz uma requisição para obter a lista de Pokémon
    return fetch(url)
         .then((response) => response.json())
         .then((jsonBody) => jsonBody.results)
         .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Para cada Pokémon na lista, obtém detalhes usando getPokemonDetail
         .then((detailRequests) => Promise.all(detailRequests)) // Aguarda todas as requisições de detalhes serem concluídas
         .then((getPokemonsDetails) => getPokemonsDetails) // Retorna os detalhes dos Pokémon
}


