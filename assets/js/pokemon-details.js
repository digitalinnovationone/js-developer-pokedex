
function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}



const pokemonId = getQueryParam("pokemon");
const pokid = `${pokemonId}`;

const uRl = `https://pokeapi.co/api/v2/pokemon-species/${pokid}`
console.log(uRl)
function cvPkTli (pokemonTypes){
    return pokemonTypes.map((typeSlot) => typeSlot.type.name)
    
}



if (pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`) 
         
        .then((response) => response.json())
        .then((pokemonData) => {
            const [type] = cvPkTli(pokemonData.types);
            const d = pokemonId;
            
            const pokemonsDetail = document.getElementById("perfil");
            pokemonsDetail.innerHTML = `
            <section class="card ${type}">
                    <div >
                        <header>
                            <ol class="pokeDt">
                                <li class="number">#${pokemonData.id}</li>
                                <li class="name">${pokemonData.name}</li>
                                <div class="detail">
                                    <ol class="types">
                                        ${pokemonData.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                                    </ol>
                                </div>    
                            </ol>
                        </header>
                    </div>
                    <div class="ft">
                        <section class="pokeFt">
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                        </section>    
                    </div>
                    <div class="status">                    
                        <div class="divNav">
                            <nav class="pokeNav">
                                <a id="aB" href="detalhe.html?pokemon=${d}">About</a>
                                <a id="bS" href="Base_Status.html?pokemon=${d}">Base Status</a>
                                <a id="eV" href="Evolution.html?pokemon=${d}">Evolution</a>
                                <a id="mO" href="Movies.html?pokemon=${d}">Moves</a>
                            </nav>
                        </div>
                        <div id="sta" class="divS">
                                ${ fetch(uRl)
                                    .then((response) => response.json())
                                        .then((pokemonDt) => {
                                                      
                                            const pokemonsDt = document.getElementById("sta");
                                            pokemonsDt.innerHTML = `
                                                <article>
                                                    <ol class="about">
                                                        <li>Species: ${pokemonDt.genera[7].genus}</li>
                                                        <li>Height: ${pokemonData.height}</li>
                                                        <li>Weight: ${pokemonData.weight}</li>
                                                        <li>Abilits: ${pokemonData.abilities.map((abilitySlot) => abilitySlot.ability.name).join(', ')}</li>
                                                    </ol>
                                                    <h4>Breeding</h4>
                                                    <ol class="bre">
                                                        <li>Gender: ${pokemonDt.gender_rate}</li>                                
                                                        ${pokemonDt.egg_groups.map((egg_groupSlot) => `<li>Egg Groups: ${egg_groupSlot.name}</li>`).join('')}
                                                    </ol>
                                                </article>                                            
                                            `                      
                                        }) }
                        </div>
                            
                    </div>
                    <div class="pagination ${type}">
                    <button id="back-home" type="button" onClick=goHome()>
                        Back
                    </button>
                </div> 
            </section>
                  
            `
        })
       
}


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`) 
         
        .then((response) => response.json())
        .then((pokemonData) => {
            const [type] = cvPkTli(pokemonData.types);
            const d = pokemonId;
           
            
            const pokemonsDetail = document.getElementById("Bstatus");
            pokemonsDetail.innerHTML = `
                <section class="card ${type}">
                    <div>
                        <header>
                            <ol class="pokeDt">
                                <li class="number">#${pokemonData.id}</li>
                                <li class="name">${pokemonData.name}</li>
                                <div class="detail">
                                    <ol class="types">
                                    ${pokemonData.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                                    </ol>
                                </div>    
                            </ol>
                        </header>
                    </div>
                    <div class="ft">
                        <section class="pokeFt">
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                        </section>    
                    </div>
                    <div class="status">                    
                        <div class="divNav">
                            <nav class="pokeNav">
                                <a id="aB" href="detalhe.html?pokemon=${d}">About</a>
                                <a id="bS" href="Base_Status.html?pokemon=${d}">Base Status</a>
                                <a id="eV" href="Evolution.html?pokemon=${d}">Evolution</a>
                                <a id="mO" href="Movies.html?pokemon=${d}">Moves</a>
                            </nav>
                        </div>
                            <div class="divS">
                                <article>
                                    <ol class="about">
                                        <li class="hp">HP<span id="h" class="space"></span>
                                        <span class"alinhar">${pokemonData.stats[0].base_stat}</span>
                                        <style>
                                            span#vH{
                                                animation-name: linha0;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: green;
                                                
                                            }
                                            @keyframes linha0{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[0].base_stat)/10}px;}
                                            }
                                        </style>
                                        <span id="vH" class="line">------------------------</span></li>
                                        <li class="att">Attack<span id="a" class="space"></span>
                                        <span class"alinhar">${pokemonData.stats[1].base_stat}</span>
                                        <style>
                                            span#vAtt{
                                                animation-name: linha1;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: green;
                                                
                                            }
                                            @keyframes linha1{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[1].base_stat)/10}px;}
                                            }
                                        </style>
                                        <span id="vAtt" class="line">------------------------</span></li>
                                        <li class="def">Defense<span id="d" class="space"></span>
                                        <span class"alinhar">${pokemonData.stats[2].base_stat}</span>
                                        <style>
                                            span#vDef{
                                                animation-name: linha2;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: red;
                                                
                                            }
                                            @keyframes linha2{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[2].base_stat)/10}px;}
                                            }
                                        </style>
                                        <span id="vDef" class="line">------------------------</span></li>
                                        <li class="sAtt">Sp. Atk<span id="sa" class="space"></span>
                                        <span class"alinhar">${pokemonData.stats[3].base_stat}</span>
                                        <style>
                                            span#vSpAtt{
                                                animation-name: linha3;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: green;
                                                
                                            }
                                            @keyframes linha3{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[3].base_stat)/10}px;}
                                            }
                                        </style>
                                        <span id="vSpAtt" class="line">------------------------</span></li>
                                        <li class="sDef">Sp. Def<span id="sd" class="space"></span>
                                        <span class"alinhar">${pokemonData.stats[4].base_stat}</span>
                                        <style>
                                            span#vSpDef{
                                                animation-name: linha4;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: green;
                                                
                                            }
                                            @keyframes linha4{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[4].base_stat)/10}px;}
                                            }
                                        </style> 
                                        <span id="vSpDef" class="line">------------------------</span></li>
                                        <li class="Speed">Speed<span  id="sp" class="space"></span>
                                        <span class"alinhar">${pokemonData.stats[5].base_stat}</span>
                                        <style>
                                            span#vSpe{
                                                animation-name: linha5;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: red;
                                                
                                            }
                                            @keyframes linha5{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[5].base_stat)/10}px;}
                                            }
                                        </style> 
                                        <span id="vSpe" class="line">------------------------</span></li>
                                        <li class="total">Total<span  id="tot" class="space"></span>
                                        <span class"alinhar">
                                        ${pokemonData.stats[0].base_stat+pokemonData.stats[1].base_stat+pokemonData.stats[2].base_stat+pokemonData.stats[3].base_stat+pokemonData.stats[4].base_stat+pokemonData.stats[5].base_stat}
                                        <span>
                                        <style>
                                            span#vTot{
                                                animation-name: linha6;
                                                animation-duration: 1s;
                                                animation-fill-mode: forwards;
                                                margin-left: 3%;
                                                animation-timing-function: linear;
                                                position: relative;
                                                color: green;
                                                
                                            }
                                            @keyframes linha6{
                                                from{ left: 0px;}
                                                to{ left: ${(pokemonData.stats[0].base_stat+pokemonData.stats[1].base_stat+pokemonData.stats[2].base_stat+pokemonData.stats[3].base_stat+pokemonData.stats[4].base_stat+pokemonData.stats[5].base_stat)/100}px;}
                                            }
                                        </style>    
                                        <span id="vTot" class="line">------------------------</span></li>
                                    </ol>
                                    <h4>Type defenses</h4>
                                    <p></p>
                                </article>
                            </div>
                    </div>
                <div class="pagination">
                    <button id="back-home" type="button" onClick=goHome()>
                        Back
                    </button>
                </div> 
            </section>           
                `
        })
       
 
const mat = pokemonId;
let cont = parseInt(mat);
cont = cont+1; 
console.log(cont)
fetch(`https://pokeapi.co/api/v2/pokemon/${cont}`) 
         
        .then((response) => response.json())
        .then((pokemonData) => {
            const [type] = cvPkTli(pokemonData.types);
            const d = pokemonId;
           
            
            const pokemonsDetail = document.getElementById("Evolution");
            pokemonsDetail.innerHTML = `
                <section class="card ${type}">
                    <div id="nAnt">
                        ${ fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                            .then((response) => response.json())
                                .then((pokemonDt) => {
                                            
                                    const pokemonsDt = document.getElementById("nAnt");
                                    pokemonsDt.innerHTML = `
                                        <header>
                                            <ol class="pokeDt">
                                                <li class="number">#${pokemonDt.id}</li>
                                                <li class="name">${pokemonDt.name}</li>
                                                <div class="detail">
                                                    <ol class="types">
                                                    ${pokemonDt.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                                                    </ol>
                                                </div>    
                                            </ol>
                                        </header>                                            
                                    `                      
                                }) }
                        
                    </div>
                    <div class="ft">
                        <section class="pokeFt">
                            <ol class="pokeEvN">
                                <li class="name">${pokemonData.name}</li>
                                ${pokemonData.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                            </ol>
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                        </section>    
                    </div>
                    <div class="status">                    
                        <div class="divNav">
                            <nav class="pokeNav">
                                <a id="aB" href="detalhe.html?pokemon=${d}">About</a>
                                <a id="bS" href="Base_Status.html?pokemon=${d}">Base Status</a>
                                <a id="eV" href="Evolution.html?pokemon=${d}">Evolution</a>
                                <a id="mO" href="Movies.html?pokemon=${d}">Moves</a>
                            </nav>
                        </div>
                        
                        
                        
                    </div>
                <div class="pagination">
                    <button id="back-home" type="button" onClick=goHome()>
                        Back
                    </button>
                </div> 
            </section>           
                `
        })





fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`) 
         
    .then((response) => response.json())
    .then((pokemonData) => {
            const [type] = cvPkTli(pokemonData.types);
            const d = pokemonId;
            
            const pokemonsDetail = document.getElementById("Movi");
            pokemonsDetail.innerHTML = `
            <section class="card ${type}">
                    <div >
                        <header>
                            <ol class="pokeDt">
                                <li class="number">#${pokemonData.id}</li>
                                <li class="name">${pokemonData.name}</li>
                                <div class="detail">
                                    <ol class="types">
                                        ${pokemonData.types.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                                    </ol>
                                </div>    
                            </ol>
                        </header>
                    </div>
                    <div class="ft">
                        <section class="pokeFt">
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                        </section>    
                    </div>
                    <div class="status">                    
                        <div class="divNav">
                            <nav class="pokeNav">
                                <a id="aB" href="detalhe.html?pokemon=${d}">About</a>
                                <a id="bS" href="Base_Status.html?pokemon=${d}">Base Status</a>
                                <a id="eV" href="Evolution.html?pokemon=${d}">Evolution</a>
                                <a id="mO" href="Movies.html?pokemon=${d}">Moves</a>
                            </nav>
                        </div>
                        <div class="divS">
                              <p>${pokemonData.moves.map((moveSlot) =>  moveSlot.move.name).join(', ')}</p>  
                        </div>
                            
                    </div>
                    <div class="pagination ${type}">
                    <button id="back-home" type="button" onClick=goHome()>
                        Back
                    </button>
                </div> 
            </section>
                  
            `
        })        

function goHome() {
    window.location.href = "index.html";
}


document.getElementById("back-home").addEventListener("click", function () {
    window.location.href = "index.html";
});