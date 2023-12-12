// Objeto que contém métodos relacionados à PokeAPI
const pokeApi = {}

// Função que obtém uma lista de Pokémon da PokeAPI com base no deslocamento e limite
pokeApi.getPokemons = function(offset, limit) {
    // Define parâmetros padrão para offset e limit, caso não sejam fornecidos
    offset = offset || 0;
    limit = limit || 10;

    // Constrói a URL para a requisição da lista de Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    // Faz uma requisição para obter a lista de Pokémon
    return fetch(url)
        .then(function(response) {
            // Transforma a resposta em JSON
            return response.json();
        })
        .then(function(jsonBody) {
            // Acessa a propriedade 'results' do corpo JSON
            var pokemons = jsonBody.results;

            // Cria uma matriz para armazenar as promessas das requisições de detalhes
            var detailPromises = [];

            // Itera sobre cada Pokémon na lista
            for (var i = 0; i < pokemons.length; i++) {
                // Adiciona a promessa da requisição de detalhes à matriz
                detailPromises.push(pokeApi.getPokemonDetail(pokemons[i]));
            }

            // Aguarda todas as requisições de detalhes serem concluídas
            return Promise.all(detailPromises);
        })
        .then(function(getPokemonsDetails) {
            // Retorna os detalhes dos Pokémon
            return getPokemonsDetails;
        });
};

// Função que obtém detalhes de um Pokémon específico usando sua URL
pokeApi.getPokemonDetail = function(pokemon) {
    // Faz uma requisição para obter os detalhes do Pokémon usando sua URL
    return fetch(pokemon.url)
        .then(function(response) {
            // Transforma a resposta em JSON
            return response.json();
        })
        .then(function(pokemonDetail) {
            // Chama uma função para converter os detalhes da PokeAPI nos detalhes esperados de um Pokémon
            return convertPokeApiDetailToPokemon(pokemonDetail);
        });
};

// Função para converter detalhes da PokeAPI em objetos Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Cria uma nova instância de Pokémon
    const pokemon = new Pokemon();

    // Atribui o número e o nome do Pokémon com base nos detalhes da PokeAPI
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    // Cria um array para armazenar os tipos do Pokémon
    const types = [];

    // Itera sobre os slots de tipo e adiciona cada tipo ao array
    for (let i = 0; i < pokeDetail.types.length; i++) {
        types.push(pokeDetail.types[i].type.name);
    }

    // Obtém o primeiro tipo (para casos em que um Pokémon tem mais de um tipo)
    const [type] = types;

    // Configura as propriedades do Pokémon
    pokemon.types = types;
    pokemon.type = type;

    // Obtém a URL da imagem do Pokémon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Retorna o objeto Pokémon configurado
    return pokemon;
}