

//POKEMON DETALHES 

let divInferior = document.querySelector('div-inferior')
let content = document.getElementById('session')
let h1 = document.getElementById('h1')
let number = document.getElementById('number')
var imagem = document.getElementById('image')
let array = []
type = document.getElementById('type')
let divPokemon = document.getElementById('pokemon')
let teste = document.getElementById('teste')


window.addEventListener("load", (event) => {

    // função pra ler querystring
    function queryString(parameter) {
        var loc = location.search.substring(1, location.search.length);
        var param_value = false;
        var params = loc.split("&");
        var cont = 0;
        for (i = 0; i < params.length; i++) {
            param_name = params[i].substring(0, params[i].indexOf('='));
            if (param_name == parameter) {
                param_value = params[i].substring(params[i].indexOf('=') + 1)
            }
        }
        if (param_value) {
            return param_value;
        }
        else {
            return undefined;
        }
    }

    var id = queryString("id");

    var olteste = document.getElementById('olteste')

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => response.json())
        .then((data) => {

            console.log(data.results)

            h1.innerText = data.species.name
            number.innerText = "##" + data.id

            imagem.src = data.sprites.other.dream_world.front_default

            content.className = `content ${data.types[0].type.name} `

            type.innerText = `${data.types[0].type.name}`;
            console.log(data.types)


            data.types.forEach(element => {
              
                var newEl = document.createElement('li');

                newEl.innerText = `${element.type.name}`
                olteste.appendChild(newEl)
                
                
            });




            //procurar onde estão os ptypes oderes para adicionar
            //console.log("species name"+data.species.name)
            // array.push(data.types)
            //  console.log(data.types)
            //array.push(data.types)





            cont++;

        })
});



