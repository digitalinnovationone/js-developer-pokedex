// Está sendo usada a biblioteca Fetch API

const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

//fetch usa requisição do tipo GET
fetch(url) 
    //dentro do then temos uma função com a sintaxe reduzida
    .then((response) => response.json())
    .then((jsonBody) => console.log(jsonBody))
    .catch((error) => console.error(error))

// O fetch é uma requisição http que retorna uma promise. Com o fetch é feito um processamento assíncrono e não possui a resposta de imediato, a promise é a "promessa" de um resultado.
// O método then é executado após a promise para manipular a resposta
// cath é usado para quando da erro
// finally: independente do sucesso ou fracasso na resposta, essa requisição será executada