


const pokeApi={

    async getDetails(pokemon){
        return fetch(pokemon.url)
        .then((response)=>response.json())
    },

    async getInPokeModel(pokemon){
        return fetch(pokemon.url)
        .then((response)=>response.json())
        .then(createPokeModel)
    },

    async getPokemons(offset=0, limit=10){
        const boll=document.querySelector('.carga')
        boll.style.display='block'
        const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`


        /*
        fetch(url).then((reponse)=>{
            console.log(reponse)
        })


        ESSA SERIA A VERSÃO MAIS LONGA DA REQUISIÇÃO
        PORÉM, COM ARROW FUNCTIONS É POSSÍVEL REDUZI-LA
        COMO MOSTRADO ABAIXO
        */
 

        //o FETCH faz a requesição dos dados para a url e o .JSON transforma o resultado em json
        //o RESULTS converte o JSONBODY pra uma lista de objetos, que usaremos para extrair as informações
        
        return fetch(url).then((response)=> response.json())
        .then((jsonBody)=> jsonBody.results)

        //seleciona cada parte do result que é uma lista e anda para a função GRTDETAILS que faz um novo fetch para pegar os detalhes
        .then((results)=>results.map((element)=>this.getInPokeModel(element)))

        // o PROMISSE.ALL recebe uma lista de promessas e agrada enquanto todas retornam para dar proseguimento ao sistema
        .then((details)=>Promise.all(details))
        .then((deta)=>deta)

        .catch((erro)=> console.error(erro))
    },

    async getSinglePokemon(id){
        const url=`https://pokeapi.co/api/v2/pokemon/${id}`

        return fetch(url).then((response)=>response.json())
        .then(createPokeModel)
    }
};